<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260430145130 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bus ADD delist TINYINT(1) NOT NULL, CHANGE num_seat num_seat INT NOT NULL');
        $this->addSql('ALTER TABLE route_stations ADD time_to_next TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\'');
        $this->addSql('ALTER TABLE route_stations ADD CONSTRAINT FK_59DB3DC234ECB4E6 FOREIGN KEY (route_id) REFERENCES routes (id)');
        $this->addSql('ALTER TABLE routes ADD delist TINYINT(1) NOT NULL, ADD highlight TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE station ADD delist TINYINT(1) NOT NULL, CHANGE location location VARCHAR(500) NOT NULL');
        $this->addSql('ALTER TABLE travel ADD bus_id_id INT NOT NULL, ADD route_id_id INT NOT NULL, ADD departure_time TIME NOT NULL, ADD delist TINYINT(1) NOT NULL, ADD work_days VARCHAR(255) NOT NULL, ADD reverse TINYINT(1) NOT NULL, DROP start_hour, DROP end_hour, CHANGE date valid_until DATE NOT NULL');
        $this->addSql('ALTER TABLE travel ADD CONSTRAINT FK_2D0B6BCEE9123BA6 FOREIGN KEY (bus_id_id) REFERENCES bus (id)');
        $this->addSql('ALTER TABLE travel ADD CONSTRAINT FK_2D0B6BCEE23BACF9 FOREIGN KEY (route_id_id) REFERENCES routes (id)');
        $this->addSql('CREATE INDEX IDX_2D0B6BCEE9123BA6 ON travel (bus_id_id)');
        $this->addSql('CREATE INDEX IDX_2D0B6BCEE23BACF9 ON travel (route_id_id)');
        $this->addSql('DROP INDEX UNIQ_IDENTIFIER_CIT_ID ON user');
        $this->addSql('ALTER TABLE messenger_messages CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE available_at available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE delivered_at delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bus DROP delist, CHANGE num_seat num_seat INT DEFAULT 1 NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_CIT_ID ON `user` (citizen_id)');
        $this->addSql('ALTER TABLE travel DROP FOREIGN KEY FK_2D0B6BCEE9123BA6');
        $this->addSql('ALTER TABLE travel DROP FOREIGN KEY FK_2D0B6BCEE23BACF9');
        $this->addSql('DROP INDEX IDX_2D0B6BCEE9123BA6 ON travel');
        $this->addSql('DROP INDEX IDX_2D0B6BCEE23BACF9 ON travel');
        $this->addSql('ALTER TABLE travel ADD end_hour TIME NOT NULL, DROP bus_id_id, DROP route_id_id, DROP delist, DROP work_days, DROP reverse, CHANGE valid_until date DATE NOT NULL, CHANGE departure_time start_hour TIME NOT NULL');
        $this->addSql('ALTER TABLE messenger_messages CHANGE created_at created_at DATETIME NOT NULL, CHANGE available_at available_at DATETIME NOT NULL, CHANGE delivered_at delivered_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE station DROP delist, CHANGE location location VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        $this->addSql('ALTER TABLE route_stations DROP time_to_next');
        $this->addSql('ALTER TABLE routes DROP delist, DROP highlight');
    }
}
