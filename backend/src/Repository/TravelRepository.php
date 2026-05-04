<?php

namespace App\Repository;

use App\Entity\Travel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Travel>
 */
class TravelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Travel::class);
    }

    public function search($originId, $destinationId, $date)
    {
        $dayName = $date -> format('D');                                     // Get day of the week
        $qb = $this->createQueryBuilder('t')                                 //Look into travel
            ->innerJoin('t.route_id', 'r')                                   //Join routes (property name is route_id in Travel entity)
            ->innerJoin('r.routeStations', 'origin')                       //Join routeStations for origin
            ->innerJoin('r.routeStations', 'destination')                  //Join routeStations for destination
            ->andWhere('origin.station = :originId')                       //Where origin join matches the origin
            ->andWhere('destination.station = :destinationId')             //And it also matches the destination
            ->andWhere('t.valid_until >= :date')                             // Must be valid on or after the search date
            ->andWhere("LOWER(t.workDays) LIKE :daySearch") // And the day of the week must be in the workDays of the travel
            ->andWhere('t.delist = 0')                                       //And the day of the week must be in the workDays of the travel
            ->setParameter('originId', $originId)
            ->setParameter('destinationId', $destinationId)
            ->setParameter('date', $date->format('Y-m-d'))
            ->setParameter('daySearch', '%' . strtolower($dayName) . '%');

        return $qb->getQuery()->getResult();
    }
}
