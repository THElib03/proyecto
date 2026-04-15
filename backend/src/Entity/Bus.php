<?php

namespace App\Entity;

use App\Repository\BusRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BusRepository::class)]
class Bus
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 7)]
    private ?string $plateNum = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $model = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $joinDate = null;

    #[ORM\Column]
    private ?int $kmCount = 0;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $lastServ = null;

    #[ORM\Column]
    private ?int $numSeat = null;

    #[ORM\Column]
    private ?bool $delist = false;

    public function __construct()
    {
        $this -> joinDate = new \DateTime();
        $this -> lastServ = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlateNum(): ?string
    {
        return $this->plateNum;
    }

    public function setPlateNum(string $plateNum): static
    {
        $this->plateNum = $plateNum;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(?string $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getJoinDate(): ?\DateTime
    {
        return $this->joinDate;
    }

    public function setJoinDate(\DateTime $joinDate): static
    {
        $this->joinDate = $joinDate;

        return $this;
    }

    public function getKmCount(): ?int
    {
        return $this->kmCount;
    }

    public function setKmCount(int $kmCount): static
    {
        $this->kmCount = $kmCount;

        return $this;
    }

    public function getLastServ(): ?\DateTime
    {
        return $this->lastServ;
    }

    public function setLastServ(\DateTime $lastServ): static
    {
        $this->lastServ = $lastServ;

        return $this;
    }

    public function getNumSeat(): ?int
    {
        return $this->numSeat;
    }

    public function setNumSeat(int $numSeat): static
    {
        $this->numSeat = $numSeat;

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
