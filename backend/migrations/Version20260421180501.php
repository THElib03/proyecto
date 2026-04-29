<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260421180501 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE travel_stop DROP FOREIGN KEY FK_720EF51B27C2E161');
        $this->addSql('ALTER TABLE travel_stop DROP FOREIGN KEY FK_720EF51BD7E819E1');
        $this->addSql('DROP TABLE travel_stop');
        $this->addSql('ALTER TABLE travel ADD time_to_next TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\'');
        $this->addSql('ALTER TABLE user CHANGE join_date join_date DATE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE travel_stop (id INT AUTO_INCREMENT NOT NULL, travel_id_id INT NOT NULL, station_id_id INT NOT NULL, scheduled_departure TIME NOT NULL, INDEX FK_720EF51BD7E819E1 (travel_id_id), INDEX FK_720EF51B27C2E161 (station_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE travel_stop ADD CONSTRAINT FK_720EF51B27C2E161 FOREIGN KEY (station_id_id) REFERENCES station (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE travel_stop ADD CONSTRAINT FK_720EF51BD7E819E1 FOREIGN KEY (travel_id_id) REFERENCES travel (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE `user` CHANGE join_date join_date DATE DEFAULT \'curdate()\' NOT NULL');
        $this->addSql('ALTER TABLE travel DROP time_to_next');
    }
}
