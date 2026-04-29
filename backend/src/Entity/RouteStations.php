<?php

namespace App\Entity;

use App\Repository\RouteStationsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RouteStationsRepository::class)]
class RouteStations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $position = null;

    #[ORM\ManyToOne(inversedBy: 'routeStations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Routes $route = null;

    #[ORM\ManyToOne(inversedBy: 'stationRoutes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Station $station = null;

    #[ORM\Column(type: Types::TIME_IMMUTABLE)]
    private ?\DateTimeImmutable $time_to_next = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getRoute(): ?Routes
    {
        return $this->route;
    }

    public function setRoute(?Routes $route): static
    {
        $this->route = $route;

        return $this;
    }

    public function getStation(): ?Station
    {
        return $this->station;
    }

    public function setStation(?Station $station): static
    {
        $this->station = $station;

        return $this;
    }

    public function getTimeToNext(): ?\DateTimeImmutable
    {
        return $this->time_to_next;
    }

    public function setTimeToNext(\DateTimeImmutable $time_to_next): static
    {
        $this->time_to_next = $time_to_next;

        return $this;
    }
}
