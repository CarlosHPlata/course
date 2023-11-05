INSERT INTO pokemon_pc
( pc_id, custom_name, is_male, is_shiny, user_id, pokemon_id )
VALUES ( 1, "Hunter", TRUE, TRUE, 1, 6 );

INSERT INTO pokemon_pc_stats 
(pc_id, hp, attack, defense, special_attack, special_defense, speed, hp_evs, attack_evs, 
defense_evs, special_attack_evs, special_defense_evs, speed_evs ) 
VALUES (1, 78, 84, 100, 109, 100, 100, 3, 3, 3, 3, 3, 3);

INSERT INTO pokemon_pc_moves
(pc_id, name) VALUES
(1, "mega-punch");

INSERT INTO pokemon_pc_moves
(pc_id, name) VALUES
(1, "solar-beam");



INSERT INTO pokemon_pc
( pc_id, custom_name, is_male, is_shiny, user_id, pokemon_id )
VALUES ( 2, "Muzzarella", TRUE, TRUE, 1, 445 );

INSERT INTO pokemon_pc_stats 
(pc_id, hp, attack, defense, special_attack, special_defense, speed, hp_evs, attack_evs, 
defense_evs, special_attack_evs, special_defense_evs, speed_evs ) 
VALUES (2, 78, 84, 100, 109, 100, 100, 3, 3, 3, 3, 3, 3);

INSERT INTO pokemon_pc_moves
(pc_id, name) VALUES
(2, "cut");

INSERT INTO pokemon_pc_moves
(pc_id, name) VALUES
(2, "earthquake");

INSERT INTO pokemon_pc_moves
(pc_id, name) VALUES
(2, "fire-blast");