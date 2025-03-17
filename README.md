# Tech Test - Microservices Profile Management

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

API de microservicios para gestión de perfiles con autenticación segura y comunicación cifrada.

## 📋 Descripción

Sistema compuesto por dos microservicios independientes pero coordinados:
1. **MS-CRUD**: Gestión completa de perfiles (creación, actualización, eliminación)
2. **MS-Profile**: Consulta segura de información de perfiles

Características principales:
- 🔒 Comunicación HTTPS/TLS 1.2
- 🔑 Autenticación JWT 
- 🐳 Dockerizado y listo para Kubernetes
- 📊 Persistencia en MongoDB

## 🛠 Tecnologías

| Componente       | Tecnologías                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Backend          | NestJS, TypeScript, Mongoose                                               |
| Base de Datos    | MongoDB 8.0+                                                               |
| Seguridad        | JWT (RS256), HTTPS/TLS 1.2, Basic Auth,Nginx                                     |
| Infraestructura  | Docker, OpenSSL                                                       |

## 🚀 Instalación

1. Clonar repositorio:
```bash
git clone https://github.com/jeancarlosarias/tech-test-project.git
cd tech-test-project
