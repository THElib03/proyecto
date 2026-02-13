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

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $date = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $startHour = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $endHour = null;

    /**
     * @var Collection<int, Ticket>
     */
    #[ORM\OneToMany(targetEntity: Ticket::class, mappedBy: 'travel')]
    private Collection $tickets;

    public function __construct()
    {
        $this->tickets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getStartHour(): ?\DateTime
    {
        return $this->startHour;
    }

    public function setStartHour(\DateTime $startHour): static
    {
        $this->startHour = $startHour;

        return $this;
    }

    public function getEndHour(): ?\DateTime
    {
        return $this->endHour;
    }

    public function setEndHour(\DateTime $endHour): static
    {
        $this->endHour = $endHour;

        return $this;
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
}
