<?php

namespace App\Controller;

use App\Entity\Ticket;
use App\Repository\StationRepository;
use App\Repository\TravelRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/ticket')]
final class TicketController extends AbstractController
{
    #[Route('/bulk', name: 'api_ticket_bulk', methods: ['POST'])]
    public function bulkCreate(Request $request, EntityManagerInterface $em, TravelRepository $travelRepo, StationRepository $stationRepo): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        $ticketsData = $data['tickets'] ?? [];

        if (empty($ticketsData)) {
            return $this->json(['error' => 'No tickets provided'], Response::HTTP_BAD_REQUEST);
        }

        foreach ($ticketsData as $ticketInfo) {
            $travel = $travelRepo->find($ticketInfo['travelId']);
            if (!$travel) continue;

            $ticket = new Ticket();
            $ticket->setTravel($travel);
            $ticket->setOwner($user);
            $ticket->setFromId($stationRepo->find($ticketInfo['from'] ?? 1));
            $ticket->setToId($stationRepo->find($ticketInfo['to'] ?? 1));
            $ticket->setDate(new \DateTimeImmutable($ticketInfo['date'] ?? '2026-01-01'));
            $ticket->setDeparture(new \DateTimeImmutable($ticketInfo['departure_time'] ?? '00:00'));
            $ticket->setArrival(new \DateTimeImmutable($ticketInfo['arrival_time'] ?? '00:00'));
            $ticket->setPrice((float) $ticketInfo['price'] ?? 10.0);
            $ticket->setPurchaseDate(new \DateTimeImmutable());
            
            // Basic seat assignment logic; could be enhanced with a real seat map
            $ticket->setSeat(rand(1, 50));

            $em->persist($ticket);
        }

        $em->flush();

        return $this->json(['status' => 'success', 'count' => count($ticketsData)], Response::HTTP_CREATED);
    }
}
