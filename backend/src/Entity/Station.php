<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StationRepository::class)]
class Station
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 500)]
    private ?string $location = null;

    /**
     * @var Collection<int, Routes>
     */
    #[ORM\ManyToMany(targetEntity: Routes::class, inversedBy: 'stations')]
    private Collection $routes;

    /**
     * @var Collection<int, RouteStations>
     */
    #[ORM\OneToMany(targetEntity: RouteStations::class, mappedBy: 'station', orphanRemoval: true)]
    private Collection $stationRoutes;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 9)]
    private ?string $phone = null;

    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[ORM\Column]
    private ?bool $delist = null;

    public function __construct()
    {
        $this->routes = new ArrayCollection();
        $this->stationRoutes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection<int, RouteStations>
     */
    public function getStationRoutes(): Collection
    {
        return $this->stationRoutes;
    }

    public function addStationRoute(RouteStations $stationRoute): static
    {
        if (!$this->stationRoutes->contains($stationRoute)) {
            $this->stationRoutes->add($stationRoute);
            $stationRoute->setStation($this);
        }

        return $this;
    }

    public function removeStationRoute(RouteStations $stationRoute): static
    {
        if ($this->stationRoutes->removeElement($stationRoute)) {
            // set the owning side to null (unless already changed)
            if ($stationRoute->getStation() === $this) {
                $stationRoute->setStation(null);
            }
        }

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function isDelist(): ?bool
    {
        return $this->delist;
    }

    public function setDelist(bool $delist): static
    {
        $this->delist = $delist;

        return $this;
    }
}
