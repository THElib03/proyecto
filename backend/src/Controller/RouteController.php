<?php

namespace App\Controller;

use App\Entity\Routes;
use App\Form\RouteType;
use App\Repository\RouteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/route')]
final class RouteController extends AbstractController
{
    #[Route(name: 'app_route_index', methods: ['GET'])]
    public function index(RouteRepository $routeRepository): Response
    {
        return $this->render('route/index.html.twig', [
            'routes' => $routeRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_route_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $route = new Route();


        return $this->render('route/new.html.twig', [
            'route' => $route,
        ]);
    }

    #[Route('/{id}', name: 'app_route_show', methods: ['GET'])]
    public function show(Route $route): Response
    {
        return $this->render('route/show.html.twig', [
            'route' => $route,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_route_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Route $route, EntityManagerInterface $entityManager): Response
    {
        return $this->render('route/edit.html.twig', [
            'route' => $route,
        ]);
    }

    #[Route('/{id}', name: 'app_route_delete', methods: ['POST'])]
    public function delete(Request $request, Routes $route, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$route -> getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($route);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_route_index', [], Response::HTTP_SEE_OTHER);
    }
}
