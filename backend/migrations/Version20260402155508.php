<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260402155508 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bus CHANGE num_seat num_seat INT NOT NULL');
        $this->addSql('ALTER TABLE route_stations ADD CONSTRAINT FK_59DB3DC234ECB4E6 FOREIGN KEY (route_id) REFERENCES routes (id)');
        $this->addSql('ALTER TABLE station ADD address VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE station ADD phone VARCHAR(9) NOT NULL, ADD city VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE join_date join_date DATE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bus CHANGE num_seat num_seat INT DEFAULT 1 NOT NULL');
        $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        $this->addSql('ALTER TABLE `user` CHANGE join_date join_date DATE DEFAULT \'curdate()\' NOT NULL');
        $this->addSql('ALTER TABLE station DROP address');
    }
}
