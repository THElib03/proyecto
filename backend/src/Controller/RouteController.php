<?php

namespace App\Controller;

use App\Entity\Routes;
use App\Form\RouteType;
use App\Repository\RouteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/route')]
final class RouteController extends AbstractController
{
    #[Route(name: 'app_route_index', methods: ['GET'])]
    public function index(RouteRepository $routeRepository): JsonResponse
    {
        return $this->json($routeRepository->findAll());
    }

    #[Route('/new', name: 'app_route_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $route = new Routes();
        
        $route->setName($data['name'] ?? null);
        $route->setStartLocation($data['startLocation'] ?? null);
        $route->setEndLocation($data['endLocation'] ?? null);
        $route->setDistance($data['distance'] ?? null);

        $entityManager->persist($route);
        $entityManager->flush();

        return $this->json($route, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_route_show', methods: ['GET'])]
    public function show(Routes $route): JsonResponse
    {
        return $this->json($route);
    }

    #[Route('/{id}/edit', name: 'app_route_edit', methods: ['PUT'])]
    public function edit(Request $request, Routes $route, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $route->setName($data['name'] ?? $route->getName());
        $route->setStartLocation($data['startLocation'] ?? $route->getStartLocation());
        $route->setEndLocation($data['endLocation'] ?? $route->getEndLocation());
        $route->setDistance($data['distance'] ?? $route->getDistance());

        $entityManager->flush();

        return $this->json($route);
    }

    #[Route('/{id}', name: 'app_route_delete', methods: ['DELETE'])]
    public function delete(Routes $route, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($route);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
