<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251203000851 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE bus (id INT AUTO_INCREMENT NOT NULL, plate_num VARCHAR(7) NOT NULL, model VARCHAR(255) DEFAULT NULL, join_date DATE NOT NULL, km_count INT NOT NULL, last_serv DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE route (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE route_stations (id INT AUTO_INCREMENT NOT NULL, route_id INT NOT NULL, station_id INT NOT NULL, position INT NOT NULL, INDEX IDX_59DB3DC234ECB4E6 (route_id), INDEX IDX_59DB3DC221BDB235 (station_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE station (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, location VARCHAR(500) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE station_route (station_id INT NOT NULL, route_id INT NOT NULL, INDEX IDX_5A425F4F21BDB235 (station_id), INDEX IDX_5A425F4F34ECB4E6 (route_id), PRIMARY KEY(station_id, route_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ticket (id INT AUTO_INCREMENT NOT NULL, owner_id INT NOT NULL, travel_id INT NOT NULL, INDEX IDX_97A0ADA37E3C61F9 (owner_id), INDEX IDX_97A0ADA3ECAB15B3 (travel_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE travel (id INT AUTO_INCREMENT NOT NULL, date DATE NOT NULL, start_hour TIME NOT NULL, end_hour TIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, citizen_id VARCHAR(9) DEFAULT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE route_stations ADD CONSTRAINT FK_59DB3DC234ECB4E6 FOREIGN KEY (route_id) REFERENCES route (id)');
        $this->addSql('ALTER TABLE route_stations ADD CONSTRAINT FK_59DB3DC221BDB235 FOREIGN KEY (station_id) REFERENCES station (id)');
        $this->addSql('ALTER TABLE station_route ADD CONSTRAINT FK_5A425F4F21BDB235 FOREIGN KEY (station_id) REFERENCES station (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE station_route ADD CONSTRAINT FK_5A425F4F34ECB4E6 FOREIGN KEY (route_id) REFERENCES route (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA37E3C61F9 FOREIGN KEY (owner_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA3ECAB15B3 FOREIGN KEY (travel_id) REFERENCES travel (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC221BDB235');
        $this->addSql('ALTER TABLE station_route DROP FOREIGN KEY FK_5A425F4F21BDB235');
        $this->addSql('ALTER TABLE station_route DROP FOREIGN KEY FK_5A425F4F34ECB4E6');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA37E3C61F9');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA3ECAB15B3');
        $this->addSql('DROP TABLE bus');
        $this->addSql('DROP TABLE route');
        $this->addSql('DROP TABLE route_stations');
        $this->addSql('DROP TABLE station');
        $this->addSql('DROP TABLE station_route');
        $this->addSql('DROP TABLE ticket');
        $this->addSql('DROP TABLE travel');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
