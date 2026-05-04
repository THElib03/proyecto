<?php
namespace App\Service;

use App\Entity\Travel;
use App\Repository\TravelRepository;
use App\Repository\RouteRepository;
use DateTime;

    class SearchService
    {
        private TravelRepository $travelRepository;
        private RouteRepository $routeRepository;

        public function __construct(TravelRepository $travelRepository, RouteRepository $routeRepository)
        {
            $this->travelRepository = $travelRepository;
            $this->routeRepository = $routeRepository;
        }

        public function searchTravels(int $fromId, int $toId, DateTime $date): array
        {
            $travels = $this -> travelRepository -> search($fromId, $toId, $date);
            $results = [];

            foreach ($travels as $travel)
            {
                if (!$this->isDirectionValid($travel, $fromId, $toId)) {
                    continue;
                }

                $timeToTravel = $this -> calcTravelTime($travel, $fromId, $toId);
                $baseTime = clone $travel -> getDepartureTime();

                $userDeparture = $baseTime -> modify("+" . $timeToTravel['minuteFromStart'] . " minutes");
                $userArrival = (clone $userDeparture) -> modify("+" . $timeToTravel['durationMinutes'] . " minutes");

                $results[] = [
                    'travel_id' => $travel -> getId(),
                    'bus_id' => $travel -> getBusId() -> getId(),
                    'busPlate' => $travel -> getBusId()-> getPlateNum(),
                    'userDeparture' => $userDeparture -> format('H:i'),
                    'userArrival' => $userArrival -> format('H:i'),
                    'isReverse' => (bool)$travel -> isReverse(),
                    'duration' => $timeToTravel['durationFormatted']
                ];
            }

            return $results;
        }

        private function isDirectionValid(Travel $travel, int $fromId, int $toId): bool
        {
            $route = $travel -> getRouteId();
            $stations = $route -> getRouteStations();
            
            $originPos = null;
            $destPos = null;

            foreach ($stations as $rs) {
                if ($rs -> getStation() -> getId() === $fromId) $originPos = $rs -> getPosition();
                if ($rs -> getStation() -> getId() === $toId) $destPos = $rs -> getPosition();
            }

            if (!$travel->isReverse()) {
                return $originPos < $destPos; // Check si la direccion del viaje coincide 
            } else {
                return $originPos > $destPos; // con la búsqueda del usuario
            }
        }

        private function calcTravelTime(Travel $travel, int $fromId, int $toId): array
        {
            $stations = $travel -> getRouteId() -> getRouteStations() -> toArray();
            usort($stations, fn($a, $b) => $a -> getPosition() <=> $b -> getPosition());

            $travelMinutes = 0;
            $minuteFromStart = 0;
            $foundOrigin = false;

            $getMins = fn($dt) => (int)$dt->format('H') * 60 + (int)$dt->format('i');

            if(!$travel -> isReverse()) {
                foreach ($stations as $rs) {
                    $legMinutes = $getMins($rs -> getTimeToNext());
                    if ($rs -> getStation() -> getId() === $fromId) {
                        $foundOrigin = true;
                    } elseif (!$foundOrigin) {
                        $minuteFromStart += $legMinutes;
                    }

                    if($foundOrigin){
                        if($rs -> getStation() -> getId() === $toId){
                            break;
                        }
                        $travelMinutes += $legMinutes;
                    }
                }
            } else {
                $stations = array_reverse($stations); // Iterate the array backwards
                foreach ($stations as $index => $rs) {
                    $legMinutes = $getMins($stations[$index]-> getTimeToNext());
                    if ($rs -> getStation() -> getId() === $fromId) {
                        $foundOrigin = true;
                    } elseif (!$foundOrigin) {
                        $minuteFromStart += $legMinutes;
                    }

                    if ($foundOrigin) {
                        if ($rs -> getStation() -> getId() === $toId) break;
                        $travelMinutes += $legMinutes;
                    }
                }
            }

            return [
                'durationMinutes' => $travelMinutes,
                'durationFormatted' => floor($travelMinutes / 60) . 'h ' . ($travelMinutes % 60) . 'm',
                'minuteFromStart' => $minuteFromStart
            ];
        }
    }
?>