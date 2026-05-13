<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $hashPass, EntityManagerInterface $entityManager): JsonResponse {
        try{
            $data = json_decode($request -> getContent(), true);

            $requiredFields = ['username', 'mail', 'citId', 'password', 'phone'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    return $this->json(
                        ['error' => "El campo $field es requerido."],
                        Response::HTTP_BAD_REQUEST
                    );
                }
            }

            $user = new User();
            $user -> setUsername($data['username']);
            $user -> setMail($data['mail']);
            $user -> setCitizenID($data['citId']);
            $user->setPhone($data['phone']);
            $user -> setPassword($hashPass -> hashPassword($user, trim($data['password'])));

            $entityManager->persist($user);
            $entityManager->flush();
            return $this -> json(['message' => 'Se ha registrado su nueva cuenta.'], Response::HTTP_OK);
        }
        catch(UniqueConstraintViolationException $e){
            if (str_contains($e->getMessage(), 'UNIQ_IDENTIFIER_MAIL')) {
                return $this->json(
                    ['error' => 'Este email ya está registrado.'],
                    Response::HTTP_CONFLICT
                );
            } elseif (str_contains($e->getMessage(), 'UNIQ_IDENTIFIER_CIT_ID')) {
                return $this->json(
                    ['error' => 'Este número de identificación ya existe.'],
                    Response::HTTP_CONFLICT
                );
            }
            // Generic duplicate error
            return $this->json(
                ['error' => 'Los datos proporcionados ya existen en el sistema.'],
                Response::HTTP_CONFLICT
            );
        }
        catch (\Exception $e) {
            error_log('Registration error: ' . $e->getMessage());
            
            return $this->json(
                ['error' => 'Ocurrió un error durante el registro. Intente nuevamente más tarde.'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request, UserPasswordHasherInterface $hashPass, UserRepository $userRepo): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $checkUser = $userRepo->findOneBy(['mail' => $data['mail']]);

        if (!isset($checkUser)) {
            return $this->json(['error' => 'Correo electrónico o contraseña incorrectos.'], Response::HTTP_UNAUTHORIZED);
        }

        if ($hashPass->isPasswordValid($checkUser, trim($data['password']))) {
            return $this->json(['message' => 'Logged in successfully'], Response::HTTP_OK, []);
        }
        return $this->json(['error' => 'Correo electrónico o contraseña incorrectos.'], Response::HTTP_UNAUTHORIZED);
    }

    #[Route('/validate', name: 'api_validate', methods: ['GET'])]
    public function validate(Request $request, UserRepository $userRepo): JsonResponse
    {
        $token = $request->headers->get('Authorization');
        $token = str_replace('Bearer ', '', $token);
        $payload = json_decode(base64_decode(explode('.', $token)[1]), true);
        $mail = $payload['username'];

        $checkUser = $userRepo->findOneBy(['mail' => $mail]);

        if (!isset($checkUser)) {
            return $this->json(['error' => 'User not found.'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'username' => $checkUser -> getUsernameFix(),
            'mail' => $checkUser -> getMail(),
            'citId' => $checkUser -> getCitizenID(),
            'joinDate' => $checkUser -> getJoinDate(),
            'totalTicket' => count($checkUser->getTickets()),
        ], Response::HTTP_OK);
    }

    #[Route('/admin', name: 'api_admin_validate', methods: ['POST'])]
    public function validateAdmin(Request $request, UserRepository $userRepo): JsonResponse
    {   
        $token = $request->headers->get('Authorization');
        $token = str_replace('Bearer ', '', $token);
        $payload = json_decode(base64_decode(explode('.', $token)[1]), true);
        $checkUser = $userRepo->findOneBy(['mail' => $payload['username']]);

        if (!isset($checkUser) || !in_array('ROLE_ADMIN', $checkUser -> getRoles())) {
            return $this->json(['error' => 'Correo electrónico o contraseña incorrectos.'], Response::HTTP_FORBIDDEN);
        }

        return $this->json(['message' => 'Admin session is valid'], Response::HTTP_OK);
    }

    #[Route('/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {

        return $this->json([
            'message' => 'Logged out successfully'
        ], Response::HTTP_OK);
    }
}
