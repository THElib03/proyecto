<?php

namespace App\Controller;

use App\Entity\Routes;
use App\Entity\RouteStations;
use App\Repository\RouteRepository;
use App\Repository\RouteStationsRepository;
use App\Repository\StationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/route')]
final class RouteController extends AbstractController
{
    #[Route(name: 'app_route_index', methods: ['GET'])]
    public function index(RouteRepository $routeRepository): JsonResponse
    {
        $routes = $routeRepository->findAll();
        $data = array_map(function ($route) {
            return [
                'id' => $route->getId(),
                'name' => $route->getName(),
                'delist' => $route->isDelist(),
            ];
        }, $routes);
        
        return $this->json($data);
    }

    #[Route('/new', name: 'app_route_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $route = new Routes();
        
        $route->setName($data['name'] ?? null);

        $entityManager->persist($route);
        $entityManager->flush();

        $responseData = [
            'id' => $route->getId(),
            'name' => $route->getName(),
            'delist' => $route->isDelist(),
        ];

        return $this->json($responseData, Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_route_show', methods: ['GET'])]
    public function show(Routes $route): JsonResponse
    {
        $data = [
            'id' => $route->getId(),
            'name' => $route->getName(),
            'delist' => $route->isDelist(),
        ];
        
        return $this->json($data);
    }

    #[Route('/{id}/edit', name: 'app_route_edit', methods: ['PUT'])]
    public function edit(Request $request, Routes $route, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $route->setName($data['name'] ?? $route->getName());

        $entityManager->flush();

        $responseData = [
            'id' => $route->getId(),
            'name' => $route->getName(),
            'delist' => $route->isDelist(),
        ];

        return $this->json($responseData);
    }

    #[Route('/{id}', name: 'app_route_delete', methods: ['DELETE'])]
    public function delete(Routes $route, EntityManagerInterface $entityManager): JsonResponse
    {
        $route -> setDelist(true);
        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/stations', name: 'app_route_stations_index', methods: ['GET'])]
    public function getStations(Routes $route): JsonResponse
    {
        $routeStations = $route->getRouteStations()->toArray();
        usort($routeStations, function ($a, $b) {
            return $a->getPosition() <=> $b->getPosition();
        });

        $data = array_map(function ($rs) {
            return [
                'id' => $rs->getId(),
                'position' => $rs->getPosition(),
                'station' => [
                    'id' => $rs->getStation()->getId(),
                    'name' => $rs->getStation()->getName(),
                    'city' => $rs->getStation()->getCity(),
                    'address' => $rs->getStation()->getAddress(),
                    'phone' => $rs->getStation()->getPhone(),
                ]
            ];
        }, $routeStations);

        return $this->json($data);
    }

    #[Route('/{id}/stations', name: 'app_route_stations_add', methods: ['POST'])]
    public function addStation(Routes $route, Request $request, StationRepository $stationRepository, RouteStationsRepository $routeStationsRepository, EntityManagerInterface $entityManager): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $stationId = $data['stationId'] ?? null;

        if (!$stationId) {
            return $this->json(['error' => 'stationId is required'], Response::HTTP_BAD_REQUEST);
        }

        $station = $stationRepository->find($stationId);
        if (!$station) {
            return $this->json(['error' => 'Station not found'], Response::HTTP_NOT_FOUND);
        }

        // Check if station already exists in route
        $existing = $routeStationsRepository->findBy([
            'route' => $route,
            'station' => $station
        ]);

        if ($existing) {
            return $this->json(['error' => 'Station already in this route'], Response::HTTP_CONFLICT);
        }

        // Get max position
        $maxPosition = 0;
        foreach ($route->getRouteStations() as $rs) {
            if ($rs->getPosition() > $maxPosition) {
                $maxPosition = $rs->getPosition();
            }
        }

        $routeStation = new RouteStations();
        $routeStation->setRoute($route);
        $routeStation->setStation($station);
        $routeStation->setPosition($maxPosition + 1);

        $entityManager->persist($routeStation);
        $entityManager->flush();

        $data = [
            'id' => $routeStation->getId(),
            'position' => $routeStation->getPosition(),
            'station' => [
                'id' => $routeStation->getStation()->getId(),
                'name' => $routeStation->getStation()->getName(),
                'city' => $routeStation->getStation()->getCity(),
                'address' => $routeStation->getStation()->getAddress(),
                'phone' => $routeStation->getStation()->getPhone(),
            ]
        ];

        return $this->json($data, Response::HTTP_CREATED);
    }

    #[Route('/{id}/stations/{stationId}', name: 'app_route_stations_remove', methods: ['DELETE'])]
    public function removeStation(Routes $route, int $stationId, EntityManagerInterface $entityManager, RouteStationsRepository $routeStationsRepository): JsonResponse {
        $routeStation = $routeStationsRepository->findOneBy([
            'route' => $route,
            'station' => $stationId
        ]);

        if (!$routeStation) {
            return $this->json(['error' => 'Station not found in this route'], Response::HTTP_NOT_FOUND);
        }

        $removedPosition = $routeStation->getPosition();
        $entityManager->remove($routeStation);

        // Reorder remaining stations
        foreach ($route->getRouteStations() as $rs) {
            if ($rs->getPosition() > $removedPosition) {
                $rs->setPosition($rs->getPosition() - 1);
            }
        }

        $entityManager->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/stations/{stationId}', name: 'app_route_stations_update', methods: ['PUT'])]
    public function updateStationPosition(Routes $route, int $stationId, Request $request, EntityManagerInterface $entityManager, RouteStationsRepository $routeStationsRepository): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $newPosition = $data['position'] ?? null;

        if ($newPosition === null) {
            return $this->json(['error' => 'a new position value is required'], Response::HTTP_BAD_REQUEST);
        }

        $routeStation = $routeStationsRepository->findOneBy([
            'route' => $route,
            'station' => $stationId
        ]);

        if (!$routeStation) {
            return $this->json(['error' => 'Station not found in this route'], Response::HTTP_NOT_FOUND);
        }

        $oldPosition = $routeStation->getPosition();

        if ($oldPosition === $newPosition) {
            $data = [
                'id' => $routeStation->getId(),
                'position' => $routeStation->getPosition(),
                'station' => [
                    'id' => $routeStation->getStation()->getId(),
                    'name' => $routeStation->getStation()->getName(),
                    'city' => $routeStation->getStation()->getCity(),
                    'address' => $routeStation->getStation()->getAddress(),
                    'phone' => $routeStation->getStation()->getPhone(),
                ]
            ];
            return $this->json($data);
        }

        // Get all route stations and reorder
        $allStations = $route->getRouteStations()->toArray();

        foreach ($allStations as $rs) {
            if ($rs === $routeStation) continue;

            $pos = $rs -> getPosition();
            if($oldPosition < $newPosition && $pos > $oldPosition && $pos <= $newPosition) {
                $rs->setPosition($pos - 1);
            } elseif ($oldPosition > $newPosition && $pos < $oldPosition && $pos >= $newPosition) {
                $rs->setPosition($pos + 1);
            }

        }

        // Set new position for the updated station
        $routeStation->setPosition($newPosition);
        $entityManager->flush();

        $data = [
            'id' => $routeStation->getId(),
            'position' => $routeStation->getPosition(),
            'station' => [
                'id' => $routeStation->getStation()->getId(),
                'name' => $routeStation->getStation()->getName(),
                'city' => $routeStation->getStation()->getCity(),
                'address' => $routeStation->getStation()->getAddress(),
                'phone' => $routeStation->getStation()->getPhone(),
            ]
        ];

        return $this->json($data);
    }
}
