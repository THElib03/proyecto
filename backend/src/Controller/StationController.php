<?php

namespace App\Controller;

use App\Entity\Station;
use App\Repository\StationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/station')]
final class StationController extends AbstractController
{
    #[Route(name: 'app_station_index', methods: ['GET'])]
    public function index(StationRepository $stationRepository): JsonResponse
    {
        $stations = $stationRepository->findAll();
        $data = array_map(function ($station) {
            return [
                'id' => $station->getId(),
                'name' => $station->getName(),
                'city' => $station->getCity(),
                'location' => $station->getLocation(),
                'address' => $station->getAddress(),
                'phone' => $station->getPhone(),
                'delist' => $station->isDelist(),
            ];
        }, $stations);
        
        return $this->json($data);
    }

    #[Route('/new', name: 'app_station_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request -> getContent(), true);
        $station = new Station();

        $station -> setName($data['name'] ?? null);
        $station -> setCity($data['city'] ?? "Granada");
        $station -> setLocation($data['location'] ?? "0.00, 0.00");
        $station -> setAddress($data['address'] ?? "Gran Via, 1");
        $station -> setPhone($data['phone'] ?? "600000000");

        $entityManager -> persist($station);
        $entityManager -> flush();

        $responseData = [
            'id' => $station->getId(),
            'name' => $station->getName(),
            'city' => $station->getCity(),
            'location' => $station->getLocation(),
            'address' => $station->getAddress(),
            'phone' => $station->getPhone(),
            'delist' => $station->isDelist(),
        ];

        return $this -> json($responseData, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_station_show', methods: ['GET'])]
    public function show(Station $station): JsonResponse
    {
        $data = [
            'id' => $station->getId(),
            'name' => $station->getName(),
            'city' => $station->getCity(),
            'location' => $station->getLocation(),
            'address' => $station->getAddress(),
            'phone' => $station->getPhone(),
            'delist' => $station->isDelist(),
        ];
        
        return $this->json($data);
    }

    #[Route('/{id}/edit', name: 'app_station_edit', methods: ['PUT'])]
    public function edit(Request $request, Station $station, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $station -> setName($data['name'] ?? $station -> getName());
        $station -> setLocation($data['location'] ?? $station -> getLocation());
        $station -> setAddress($data['address'] ?? $station -> getAddress());
        $station -> setPhone($data['phone'] ?? $station -> getPhone());

        $entityManager->flush();

        $responseData = [
            'id' => $station->getId(),
            'name' => $station->getName(),
            'city' => $station->getCity(),
            'location' => $station->getLocation(),
            'address' => $station->getAddress(),
            'phone' => $station->getPhone(),
            'delist' => $station->isDelist(),
        ];

        return $this->json($responseData);
    }

    #[Route('/{id}', name: 'app_station_delete', methods: ['DELETE'])]
    public function delete(Station $station, EntityManagerInterface $entityManager): JsonResponse
    {
        $station -> setDelist(true);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
