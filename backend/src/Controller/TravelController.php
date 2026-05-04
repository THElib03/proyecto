<?php

namespace App\Controller;

use App\Entity\Travel;
use App\Repository\RouteRepository;
use App\Repository\BusRepository;
use App\Service\SearchService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/travel')]
final class TravelController extends AbstractController
{
    #[Route('/search', name: 'api_travel_search', methods: ['GET'])]
    public function search(Request $request, SearchService $searchService): JsonResponse
    {
        $fromId = $request->query->getInt('from');
        $toId = $request->query->getInt('to');
        $dateStr = $request->query->get('date');

        if (!$fromId || !$toId || !$dateStr) {
            return $this->json(['error' => 'Missing parameters'], Response::HTTP_BAD_REQUEST);
        }

        $date = new \DateTime($dateStr);
        $results = $searchService->searchTravels($fromId, $toId, $date);

        return $this->json($results);
    }

    #[Route(name: 'app_travel_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, RouteRepository $routesRepository, BusRepository $busRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $travel = new Travel();
        
        // Set dates and times
        if (!empty($data['departure_time'])) {
            $departure = \DateTime::createFromFormat('H:i', $data['departure_time']);
            $travel -> setDepartureTime($departure);
        }
        if (!empty($data['valid_until'])) {
            $travel -> setValidUntil(new \DateTime($data['valid_until']));
        }
        
        // Set work days
        $travel -> setWorkDays($data['work_days'] ?? ''); 
        
        // Set bus and route
        if (!empty($data['bus_id'])) {
            $bus = $busRepository -> find($data['bus_id']);
            if ($bus) {
                $travel -> setBusId($bus);
            }
        }
        
        if (!empty($data['route_id'])) {
            $route = $routesRepository -> find($data['route_id']);
            if ($route) {
                $travel ->setRouteId($route);
            }
        }
        
        $travel -> setDelist(false);
        $travel -> setReverse($data['reverse'] ?? false);
        
        $entityManager -> persist($travel);
        $entityManager -> flush();
        
        return $this->json(['id' => $travel->getId()], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_travel_show', methods: ['GET'])]
    public function show(Travel $travel): JsonResponse
    {
        return $this->json([
            'id' => $travel->getId(),
            'departureTime' => $travel->getDepartureTime() ? $travel->getDepartureTime()->format('H:i') : null,
            'validUntil' => $travel->getValidUntil() ? $travel->getValidUntil()->format('Y-m-d') : null,
            'workDays' => $travel->getWorkDays(),
            'reverse' => $travel->isReverse(),
            'delist' => $travel->isDelist(),
            'bus' => $travel->getBusId() ? [
                'id' => $travel->getBusId()->getId(),
                'plateNum' => $travel->getBusId()->getPlateNum(),
                'model' => $travel->getBusId()->getModel(),
            ] : null,
            'routeId' => $travel->getRouteId() ? $travel->getRouteId()->getId() : null,
        ]);
    }

    #[Route('/{id}', name: 'app_travel_edit', methods: ['PUT'])]
    public function edit(Travel $travel, Request $request, EntityManagerInterface $entityManager, BusRepository $busRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!empty($data['departure_time'])) {
            $departure = \DateTime::createFromFormat('H:i', $data['departure_time']);
            $travel->setDepartureTime($departure);
        }
        if (!empty($data['valid_until'])) {
            $travel->setValidUntil(new \DateTime($data['valid_until']));
        }
        if (!empty($data['end_hour'])) {
            $endHour = \DateTime::createFromFormat('H:i', $data['end_hour']);
        }
        
        if (!empty($data['work_days'])) {
            $travel->setWorkDays($data['work_days']);
        }
        
        if (!empty($data['bus_id'])) {
            $bus = $busRepository->find($data['bus_id']);
            if ($bus) {
                $travel->setBusId($bus);
            }
        }
        
        // Handle reverse field
        if (isset($data['reverse'])) {
            $travel->setReverse($data['reverse']);
        }
        
        $entityManager->flush();
        
        return $this->json(['id' => $travel->getId()]);
    }

    #[Route('/{id}/delist', name: 'app_travel_delist', methods: ['PUT'])]
    public function delist(Travel $travel, EntityManagerInterface $entityManager): JsonResponse
    {
        $travel->setDelist(true);
        $entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
}
