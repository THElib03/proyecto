<?php

namespace App\Entity;

use App\Repository\RouteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RouteRepository::class)]
class Routes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Station>
     */
    #[ORM\ManyToMany(targetEntity: Station::class, mappedBy: 'routes')]
    private Collection $stations;

    /**
     * @var Collection<int, RouteStations>
     */
    #[ORM\OneToMany(targetEntity: RouteStations::class, mappedBy: 'route', orphanRemoval: true)]
    private Collection $routeStations;

    #[ORM\Column]
    private ?bool $delist = null;

    /**
     * @var Collection<int, Travel>
     */
    #[ORM\OneToMany(targetEntity: Travel::class, mappedBy: 'route_id', orphanRemoval: true)]
    private Collection $travel;

    public function __construct()
    {
        $this->stations = new ArrayCollection();
        $this->routeStations = new ArrayCollection();
        $this->travel = new ArrayCollection();
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

    /**
     * @return Collection<int, RouteStations>
     */
    public function getRouteStations(): Collection
    {
        return $this->routeStations;
    }

    public function addRouteStation(RouteStations $routeStation): static
    {
        if (!$this->routeStations -> contains($routeStation)) {
            $this->routeStations -> add($routeStation);
            $routeStation -> setRoute($this);
        }

        return $this;
    }

    public function removeRouteStation(RouteStations $routeStation): static
    {
        if ($this->routeStations->removeElement($routeStation)) {
            // set the owning side to null (unless already changed)
            if ($routeStation->getRoute() === $this) {
                $routeStation->setRoute(null);
            }
        }

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

    /**
     * @return Collection<int, Travel>
     */
    public function getTravel(): Collection
    {
        return $this->travel;
    }

    public function addTravel(Travel $travel): static
    {
        if (!$this->travel->contains($travel)) {
            $this->travel->add($travel);
            $travel->setRouteId($this);
        }

        return $this;
    }

    public function removeTravel(Travel $travel): static
    {
        if ($this->travel->removeElement($travel)) {
            // set the owning side to null (unless already changed)
            if ($travel->getRouteId() === $this) {
                $travel->setRouteId(null);
            }
        }

        return $this;
    }
}
