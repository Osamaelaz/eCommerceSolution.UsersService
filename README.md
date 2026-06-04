# eCommerce Solution - Users Service Microservice

A complete User Management and Authentication Microservice built with a **Clean Architecture (Onion)** ASP.NET Core 8 Web API backend and a modern **Angular 17** frontend, backed by **PostgreSQL** using **Dapper** for performance-optimized data access.

---

## 🏗️ Architecture Overview

The project is structured into two main applications (Backend and Frontend) implementing industry-standard design patterns:

### 1. Backend (`/Backend`) - ASP.NET Core 8
Designed following **Clean Architecture** principles to separate concerns, improve testability, and decouple the core business logic from external frameworks:

*   **`eCommerce.API` (Presentation Layer)**:
    *   Exposes REST endpoints for user authentication.
    *   Manages CORS policies, routing, and Swagger UI integration.
    *   Implements custom global Exception Handling Middleware.
*   **`eCommerce.Core` (Core Business Layer)**:
    *   **Entities**: Core business models (e.g., `ApplicationUser`).
    *   **Service & Repository Contracts**: Interfaces defining business logic and persistence requirements (`IUsersService`, `IUsersRepository`).
    *   **Services**: Core business implementation (validating registrations and checking credentials).
    *   **DTOs**: Dedicated Request/Response models (`RegisterRequest`, `LoginRequest`, `AuthenticationResponse`).
    *   **Validators & Mappers**: Automatic request validations using **FluentValidation** and object mapping using **AutoMapper**.
*   **`eCommerce.Infrastructure` (Data/Infrastructure Layer)**:
    *   Implements the Repository contracts.
    *   Initializes `DapperDbContext` mapping to a PostgreSQL instance.
    *   Handles database operations via **Dapper** using highly optimized raw SQL queries.

### 2. Frontend (`/Front`) - Angular 21
A responsive single-page application built on Angular 21 containing:
*   **Authentication Components**: Fully featured components for User Registration and User Login.
*   **Routing**: Custom routing setup mapping login, register, and a showcase page.
*   **Services**: Reactive HTTP services communicating seamlessly with the ASP.NET Core API.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology / Library | Description |
| :--- | :--- | :--- |
| **Backend Core** | `.NET 8.0` / ASP.NET Core | Main web API framework. |
| **Microservice DB** | `PostgreSQL` | High-performance relational database. |
| **Data Access** | `Dapper` (v2.1.79) | High-performance Micro-ORM for SQL mapping. |
| **Validation** | `FluentValidation` | Robust, strongly-typed model validation. |
| **Mapping** | `AutoMapper` | Object-to-object mapping for DTOs. |
| **Documentation**| `Swagger / OpenAPI` | Endpoint documentation and interactive testing sandbox. |
| **Frontend Core** | `Angular 21` | Client-side reactive interface. |

---

## 🗄️ Database Setup (PostgreSQL)

The Users Service persists user registration and credential data to a PostgreSQL table named `Users`.

### Create Table Schema
Run the following SQL script on your PostgreSQL server (e.g., in a database named `eCommerceUsers`):

```sql
CREATE TABLE public."Users" (
    "UserID" UUID PRIMARY KEY,
    "Email" VARCHAR(255) NOT NULL UNIQUE,
    "Password" VARCHAR(255) NOT NULL,
    "PersonName" VARCHAR(100) NOT NULL,
    "Gender" VARCHAR(10) NOT NULL
);
```

---

## 🚀 Getting Started

### Prerequisites
*   [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
*   [Node.js](https://nodejs.org/) & [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)
*   [PostgreSQL Database Server](https://www.postgresql.org/download/)

---

### Backend Setup

1.  Navigate to the Backend directory:
    ```bash
    cd Backend
    ```
2.  Configure your PostgreSQL connection string in `eCommerce.API/appsettings.json`:
    ```json
    "ConnectionStrings": {
      "PostgresConnection": "Host=localhost; Port=5432; Database=eCommerceUsers; Username=your_username; Password=your_password"
    }
    ```
3.  Restore dependencies:
    ```bash
    dotnet restore
    ```
4.  Run the application:
    ```bash
    dotnet run --project eCommerce.API
    ```
5.  Access the interactive API documentation at:
    *   Swagger UI: `http://localhost:5038/swagger/index.html` (or the port specified in your launch settings).

---

### Frontend Setup

1.  Navigate to the Frontend directory:
    ```bash
    cd Front
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm start
    ```
    *(Alternatively, run `ng serve`)*
4.  Open your browser and navigate to `http://localhost:4200/`.

---

## 🔗 Endpoint Reference

### Authentication Controller (`/api/auth`)

*   **`POST /api/auth/register`**
    *   Registers a new user in the system.
    *   Payload:
        ```json
        {
          "email": "user@example.com",
          "password": "Password123!",
          "personName": "John Doe",
          "gender": "Male"
        }
        ```
*   **`POST /api/auth/login`**
    *   Authenticates a user and returns their session details.
    *   Payload:
        ```json
        {
          "email": "user@example.com",
          "password": "Password123!"
        }
        ```
