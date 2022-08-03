--command to add seeds (from inside db folder)
-- \i db/seeds/01_seeds.sql;

DELETE FROM photos;
DELETE FROM diveSites;
DELETE FROM heatPoints;
DELETE FROM diveSiteWait;
DELETE FROM photoWait;

ALTER SEQUENCE photos_id_seq RESTART WITH 1;
ALTER SEQUENCE diveSites_id_seq RESTART WITH 1;
ALTER SEQUENCE heatPoints_id_seq RESTART WITH 1;
ALTER SEQUENCE diveSiteWait_id_seq RESTART WITH 1;
ALTER SEQUENCE photoWait_id_seq RESTART WITH 1;

INSERT INTO diveSites("name", lat, lng)
VALUES ('Whytecliff Park', 49.3714, -123.2925),
('Porteau Cove', 49.5615, -123.236944),
('Kelvin Grove', 49.4495, -123.2405),
('HMCS Annapolis', 49.449722, -123.329),
('Madrona Point', 49.3134, -124.2424),
('HMCS Saskatchewan', 49.216, -123.885278),
('HMCS Cape Breton', 49.214, -123.885278),
('Snake Island', 49.217, -123.893),
('Xihuw Boeing 737', 48.936, -123.718),
('Copper Cliffs', 50.098, -125.273),
('Steep Island', 50.0805, -125.255),
('HMCS Columbia', 50.1325, -125.336),
('Browning Wall', 50.846, -127.643)