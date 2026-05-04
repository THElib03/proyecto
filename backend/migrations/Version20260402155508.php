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
        $this->addSql('ALTER TABLE bus ADD delist TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE routes ADD delist TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE station ADD delist TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE route_stations CHANGE time_to_next time_to_next TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\'');
        $this->addSql('ALTER TABLE ticket ADD from_id_id INT NOT NULL, ADD to_id_id INT NOT NULL, ADD seat INT NOT NULL, ADD uid CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\'');
        $this->addSql('ALTER TABLE ticket ADD date DATE NOT NULL COMMENT \'(DC2Type:date_immutable)\', ADD departure VARCHAR(255) NOT NULL, ADD arrival TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', CHANGE uid uid CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\'');
        $this->addSql('ALTER TABLE ticket ADD price DOUBLE PRECISION NOT NULL, ADD purchase_date DATE NOT NULL');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA34632BB48 FOREIGN KEY (from_id_id) REFERENCES station (id)');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA37478AF67 FOREIGN KEY (to_id_id) REFERENCES station (id)');
        $this->addSql('CREATE INDEX IDX_97A0ADA34632BB48 ON ticket (from_id_id)');
        $this->addSql('CREATE INDEX IDX_97A0ADA37478AF67 ON ticket (to_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bus CHANGE num_seat num_seat INT DEFAULT 1 NOT NULL');
        $this->addSql('ALTER TABLE route_stations DROP FOREIGN KEY FK_59DB3DC234ECB4E6');
        $this->addSql('ALTER TABLE `user` CHANGE join_date join_date DATE DEFAULT \'curdate()\' NOT NULL');
        $this->addSql('ALTER TABLE station DROP address');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA34632BB48');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA37478AF67');
        $this->addSql('DROP INDEX IDX_97A0ADA34632BB48 ON ticket');
        $this->addSql('DROP INDEX IDX_97A0ADA37478AF67 ON ticket');
        $this->addSql('ALTER TABLE ticket DROP from_id_id, DROP to_id_id, DROP seat, DROP uid');
        $this->addSql('ALTER TABLE ticket DROP date, DROP departure, DROP arrival, CHANGE uid uid CHAR(36) NOT NULL');
        $this->addSql('ALTER TABLE ticket DROP price, DROP purchase_date');
        $this->addSql('ALTER TABLE route_stations CHANGE time_to_next time_to_next TIME NOT NULL');
    }
}
