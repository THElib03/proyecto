<?php

namespace App\Controller;

use App\Entity\Bus;
use App\Repository\BusRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/bus')]
final class BusController extends AbstractController
{
    #[Route(name: 'app_bus_index', methods: ['GET'])]
    public function index(BusRepository $busRepository): JsonResponse
    {
        return $this->json(['buses' => $busRepository->findAll()]);
    }

    #[Route('/new', name: 'app_bus_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $bus = new Bus();
            
            $bus->setPlateNum($data['plateNum'] ?? null);
            $bus->setModel($data['model'] ?? null);
            $bus->setNumSeat($data['numSeat'] ?? null);
            // $bus->setStatus($data['status'] ?? 'active');
            
            $entityManager->persist($bus);
            $entityManager->flush();
            
            return $this->json(['message' => 'Bus created successfully', 'bus' => $bus], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{id}', name: 'app_bus_show', methods: ['GET'])]
    public function show(Bus $bu): JsonResponse
    {
        return $this->json($bu, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'app_bus_edit', methods: ['PUT'])]
    public function edit(Request $request, Bus $bus, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            if (isset($data['licensePlate'])) $bus->setPlateNum($data['licensePlate']);
            if (isset($data['model'])) $bus->setModel($data['model']);
            if (isset($data['capacity'])) $bus->setNumSeat($data['capacity']);
            // if (isset($data['status'])) $bus->setStatus($data['status']);
            
            $entityManager->flush();
            
            return $this->json(['message' => 'Bus updated successfully', 'bus' => $bus], Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{id}', name: 'app_bus_delete', methods: ['DELETE'])]
    public function delete(Bus $bus, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $entityManager->remove($bus);
            $entityManager->flush();
            
            return $this->json(['message' => 'Bus deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
