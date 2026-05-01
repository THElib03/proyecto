<?php

namespace App\Entity;

use App\Repository\TravelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TravelRepository::class)]
class Travel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $departure_time = null;

    /**
     * @var Collection<int, Ticket>
     */
    #[ORM\OneToMany(targetEntity: Ticket::class, mappedBy: 'travel')]
    private Collection $tickets;

    #[ORM\ManyToOne(inversedBy: 'travel')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Bus $bus_id = null;

    #[ORM\ManyToOne(inversedBy: 'travel')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Routes $route_id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $valid_until = null;

    #[ORM\Column]
    private ?bool $delist = false;

    #[ORM\Column(length: 255)]
    private ?string $workDays = "Mon";

    #[ORM\Column]
    private ?bool $reverse = false;

    public function __construct()
    {
        $this->tickets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Ticket>
     */
    public function getTickets(): Collection
    {
        return $this->tickets;
    }

    public function addTicket(Ticket $ticket): static
    {
        if (!$this->tickets->contains($ticket)) {
            $this->tickets->add($ticket);
            $ticket->setTravel($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        if ($this->tickets->removeElement($ticket)) {
            // set the owning side to null (unless already changed)
            if ($ticket->getTravel() === $this) {
                $ticket->setTravel(null);
            }
        }

        return $this;
    }

    public function getBusId(): ?bus
    {
        return $this->bus_id;
    }

    public function setBusId(?bus $bus_id): static
    {
        $this->bus_id = $bus_id;

        return $this;
    }

    public function getRouteId(): ?Routes
    {
        return $this->route_id;
    }

    public function setRouteId(?Routes $route_id): static
    {
        $this->route_id = $route_id;

        return $this;
    }

    public function getValidUntil(): ?\DateTime
    {
        return $this->valid_until;
    }

    public function setValidUntil(\DateTime $valid_until): static
    {
        $this->valid_until = $valid_until;

        return $this;
    }

    public function getDepartureTime(): ?\DateTime
    {
        return $this->departure_time;
    }

    public function setDepartureTime(\DateTime $departure_time): static
    {
        $this->departure_time = $departure_time;

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

    public function getWorkDays(): ?string
    {
        return $this->workDays;
    }

    public function setWorkDays(string $workDays): static
    {
        $this->workDays = $workDays;

        return $this;
    }

    public function isReverse(): ?bool
    {
        return $this->reverse;
    }

    public function setReverse(bool $reverse): static
    {
        $this->reverse = $reverse;

        return $this;
    }
}
