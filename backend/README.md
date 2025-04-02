# .NET Web API Project

This is a .NET Web API project targeting .NET 8.0, using various dependencies to handle functionality like authentication, database management, and API documentation.

## Project Overview

This project is a simple web API built with **.NET 8.0**, leveraging the **ASP.NET Core** framework. It includes essential dependencies for authentication, Entity Framework Core for data management, and automatic API documentation using Swashbuckle.

## Prerequisites

To get started with this project, you need the following installed:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet)
- [Visual Studio](https://visualstudio.microsoft.com/) or your preferred .NET IDE

## Features

- **AutoMapper** for object mapping between DTOs and entities.
- **BCrypt.Net** for secure password hashing.
- **JWT Authentication** for secure API access using `Microsoft.AspNetCore.Authentication.JwtBearer`.
- **Entity Framework Core** for database interaction with SQL Server.
- **Swashbuckle.AspNetCore** for API documentation (Swagger).
- **Docker Support** for containerized deployments, defaulting to Linux as the target OS.

## Project Folder Structure

- **Attributes**  
  Custom attributes used throughout the project for metadata, such as validation or API routing.

- **Authorization**  
  Handles authentication and authorization, including:

  - JWT validation
  - Role-based access control

- **Controllers**  
  MVC controllers that handle HTTP requests, process input, and return responses. For example:

  - `PatientsController`

- **Data**  
  Contains database context and seed data classes, typically using Entity Framework Core.

- **Dtos**  
  Data Transfer Objects used for communication between layers or services, such as:

  - API request and response models

- **Models**  
  Business models or entities representing data structures that map to database tables.

- **Repositories**  
  Defines repository classes for data access and abstracting database interactions. For example:

  - `IPatientRepository`

- **Services**  
  Contains business logic services, handling operations such as:

  - Data processing
  - External service calls

- **Dependencies.cs**  
  Manages project dependencies and service registration for dependency injection.

- **MappingProfile.cs**  
  Configures object mapping using AutoMapper, transforming entities to DTOs and vice versa.
