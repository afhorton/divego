--command to add tables (from inside db folder)
-- \i db/schema/01_schema.sql;

DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS diveSites CASCADE;
DROP TABLE IF EXISTS heatPoints CASCADE;
DROP TABLE IF EXISTS diveSiteWait CASCADE;
DROP TABLE IF EXISTS photoWait CASCADE;
DROP TABLE IF EXISTS administrator CASCADE;

CREATE TABLE photos (
    id SERIAL PRIMARY KEY NOT NULL,
    photoFile BYTEA NOT NULL,
    label VARCHAR(255) NOT NULL,
    dateTaken DATE NOT NULL,
    latitude FLOAT NOT NULl,
    longitude FLOAT NOT NULL
);

CREATE TABLE diveSites (
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULl,
    lng FLOAT NOT NULL
);

CREATE TABLE heatPoints (
    id SERIAL PRIMARY KEY NOT NULL,
    lat FLOAT NOT NULl,
    lng FLOAT NOT NULL,
    "weight" INTEGER NOT NULL,
    animal VARCHAR(255) NOT NULL,
    "month" INTEGER NOT NULL
);

CREATE TABLE diveSiteWait (
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULl,
    lng FLOAT NOT NULL
);

CREATE TABLE photoWait (
    id SERIAL PRIMARY KEY NOT NULL,
    photoFile BYTEA NOT NULL,
    label VARCHAR(255) NOT NULL,
    dateTaken DATE NOT NULL,
    latitude FLOAT NOT NULl,
    longitude FLOAT NOT NULL
);

CREATE TABLE administrator (
    id SERIAL PRIMARY KEY NOT NULL,
    pass VARCHAR(255) NOT NULL
);