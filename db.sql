-- Crear base de datos
CREATE DATABASE cursos;
\c cursos
-- Crear tabla en DB cursos
CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    nivel INT,
    fecha DATE,
    duracion INT
);

