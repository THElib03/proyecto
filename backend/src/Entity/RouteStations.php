<?php

namespace App\Entity;

use App\Repository\RouteStationsRepository;
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
    private ?Route $route = null;

    #[ORM\ManyToOne(inversedBy: 'stationRoutes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Station $station = null;

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

    public function getRoute(): ?Route
    {
        return $this->route;
    }

    public function setRoute(?Route $route): static
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
}
