<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260324084004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        // $this->addSql('CREATE TABLE routes (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        // $this->addSql('CREATE TABLE station_routes (station_id INT NOT NULL, routes_id INT NOT NULL, INDEX IDX_FD37D15521BDB235 (station_id), INDEX IDX_FD37D155AE2C16DC (routes_id), PRIMARY KEY(station_id, routes_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        // $this->addSql('ALTER TABLE station_routes ADD CONSTRAINT FK_FD37D15521BDB235 FOREIGN KEY (station_id) REFERENCES station (id) ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE station_routes ADD CONSTRAINT FK_FD37D155AE2C16DC FOREIGN KEY (routes_id) REFERENCES routes (id) ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE station_route DROP FOREIGN KEY FK_5A425F4F21BDB235');
        // $this->addSql('ALTER TABLE station_route DROP FOREIGN KEY FK_5A425F4F34ECB4E6');
        // $this->addSql('DROP TABLE station_route');
        // $this->addSql('DROP TABLE route');
        $this->addSql('ALTER TABLE bus ADD num_seat INT DEFAULT 1 NOT NULL, CHANGE join_date join_date DATE NOT NULL, CHANGE km_count km_count INT NOT NULL, CHANGE last_serv last_serv DATE NOT NULL');
        // $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        // $this->addSql('ALTER TABLE route_stations ADD CONSTRAINT FK_59DB3DC234ECB4E6 FOREIGN KEY (route_id) REFERENCES routes (id)');
        $this->addSql('ALTER TABLE user CHANGE join_date join_date DATE NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        // $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        // $this->addSql('CREATE TABLE station_route (station_id INT NOT NULL, route_id INT NOT NULL, INDEX IDX_5A425F4F21BDB235 (station_id), INDEX IDX_5A425F4F34ECB4E6 (route_id), PRIMARY KEY(station_id, route_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        // $this->addSql('CREATE TABLE route (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        // $this->addSql('ALTER TABLE station_route ADD CONSTRAINT FK_5A425F4F21BDB235 FOREIGN KEY (station_id) REFERENCES station (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE station_route ADD CONSTRAINT FK_5A425F4F34ECB4E6 FOREIGN KEY (route_id) REFERENCES route (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE station_routes DROP FOREIGN KEY FK_FD37D15521BDB235');
        // $this->addSql('ALTER TABLE station_routes DROP FOREIGN KEY FK_FD37D155AE2C16DC');
        // $this->addSql('DROP TABLE routes');
        // $this->addSql('DROP TABLE station_routes');
        $this->addSql('ALTER TABLE bus DROP num_seat, CHANGE join_date join_date DATE DEFAULT \'curdate()\' NOT NULL, CHANGE km_count km_count INT DEFAULT 0 NOT NULL, CHANGE last_serv last_serv DATE DEFAULT \'curdate()\' NOT NULL');
        // $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        // $this->addSql('ALTER TABLE route_stations ADD CONSTRAINT FK_59DB3DC234ECB4E6 FOREIGN KEY (route_id) REFERENCES route (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE `user` CHANGE join_date join_date DATE DEFAULT \'curdate()\' NOT NULL');
    }
}
