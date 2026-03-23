<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
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

            $user = new User();
            $user->setUsername($data['username']);
            $user->setMail($data['mail']);
            $user -> setCitizenID($data['citId']);
            $user->setPassword($hashPass -> hashPassword($user, trim($data['password'])));

            if (!isset($data['password'])) {
                return $this->json(['error' => 'Introduzca una contraseña.'], Response::HTTP_BAD_REQUEST);
            }

            $entityManager->persist($user);
            $entityManager->flush();
            return $this -> json(['message' => 'Se ha registrado su nueva cuenta.'], Response::HTTP_OK);
        }
        catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
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
    public function validate(): JsonResponse
    {
        return $this->json(['message' => 'Session is valid'], Response::HTTP_OK);
    }

    #[Route('/admin', name: 'api_admin_validate', methods: ['POST'])]
    public function validateAdmin(Request $request, UserRepository $userRepo): JsonResponse
    {   
        $data = json_decode($request->getContent(), true);
        $checkUser = $userRepo->findOneBy(['mail' => $data['mail']]);

        if (!isset($checkUser)) {
            return $this->json(['error' => 'Correo electrónico o contraseña incorrectos.'], Response::HTTP_UNAUTHORIZED);
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
