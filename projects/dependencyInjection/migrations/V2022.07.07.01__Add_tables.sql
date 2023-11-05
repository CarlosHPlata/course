CREATE TABLE IF NOT EXISTS `zone` (
  id int(11) NOT NULL AUTO_INCREMENT,
  country_code varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `family` (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `family_zone` (
  zone_id int(11) NOT NULL,
  family_id int(11) NOT NULL,
  probability int(11) NOT NULL,
  PRIMARY KEY (zone_id, family_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pokemon` (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `family_pokemon` (
  pokemon_id int(11) NOT NULL,
  family_id int(11) NOT NULL,
  PRIMARY KEY (pokemon_id, family_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pokemon_pc` (
  pc_id int(11) NOT NULL AUTO_INCREMENT,
  custom_name varchar(255) DEFAULT NULL,
  is_male boolean,
  is_shiny boolean,
  user_id int(11) NOT NULL,
  pokemon_id int(11) NOT NULL,
  PRIMARY KEY (pc_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pokemon_pc_moves` (
  pc_id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  PRIMARY KEY (pc_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `pokemon_pc_stats` (
  pc_id int(11) NOT NULL,
  hp int(11) NOT NULL,
  attack int(11) NOT NULL,
  defense int(11) NOT NULL,
  special_attack int(11) NOT NULL,
  special_defense int(11) NOT NULL,
  speed int(11) NOT NULL,
  hp_evs int(11) NOT NULL,
  attack_evs int(11) NOT NULL,
  defense_evs int(11) NOT NULL,
  special_attack_evs int(11) NOT NULL,
  special_defense_evs int(11) NOT NULL,
  speed_evs int(11) NOT NULL,
  PRIMARY KEY (pc_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;