-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS project_management;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

-- Usar la base de datos
USE project_management;

-- Tabla de Proyectos
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
);

-- Tabla de Tareas
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    description TEXT,
    assigned_to INT, -- Puedes tener una tabla separada para los usuarios
    status ENUM('en_progreso', 'pendiente', 'completada') DEFAULT 'pendiente',
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

-- Tabla de Usuarios (para la autenticación)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) DEFAULT NULL,
    edad INT DEFAULT NULL,
    sexo VARCHAR(1) DEFAULT NULL,
    password_hash VARCHAR(256) DEFAULT NULL, -- Almacena el hash de la contraseña
    salt VARCHAR(16),
    activo TINYINT,
    codActivacion INT(5),
    role ENUM('admin', 'miembro') DEFAULT 'miembro'

);

-- Tabla de Mensajes del Chat
CREATE TABLE chat_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    user_id INT,
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(255), -- Add a column to store the email of the user
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
