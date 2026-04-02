<?php

namespace App\Controller;

use App\Entity\Station;
use App\Form\StationType;
use App\Repository\StationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/stations')]
final class StationController extends AbstractController
{
    #[Route(name: 'app_station_index', methods: ['GET'])]
    public function index(StationRepository $stationRepository): JsonResponse
    {
        return $this->json($stationRepository->findAll());
    }

    #[Route('/new', name: 'app_station_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $station = new Station();

        $station->setName($data['name'] ?? null);
        $station->setLocation($data['location'] ?? null);
        $station->setAddress($data['address'] ?? null);

        $entityManager->persist($station);
        $entityManager->flush();

        return $this->json($station, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_station_show', methods: ['GET'])]
    public function show(Station $station): JsonResponse
    {
        return $this->json($station);
    }

    #[Route('/{id}/edit', name: 'app_station_edit', methods: ['PUT'])]
    public function edit(Request $request, Station $station, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $station->setName($data['name'] ?? $station->getName());
        $station->setLocation($data['location'] ?? $station->getLocation());
        $station->setAddress($data['address'] ?? $station->getAddress());

        $entityManager->flush();

        return $this->json($station);
    }

    #[Route('/{id}', name: 'app_station_delete', methods: ['DELETE'])]
    public function delete(Station $station, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($station);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
