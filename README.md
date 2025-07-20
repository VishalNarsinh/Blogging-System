# Blogging System

A modern web-based Blogging System that allows users to create, manage, and explore blogs on various topics. With an intuitive interface and robust functionality, this platform is perfect for bloggers and readers alike.

---

## Features

### For Users
- **Blog Creation**: Create and publish blogs with ease.
- **Commenting**: Interact with other blogs by leaving comments.
- **Profile Management**: Manage your user profile, including bio and avatar.

### For Admins
- **User Management**: Enable/Disable users.
- **Category Management**: Create, Edit or Delete categories.

---

## Tech Stack

### Backend
- **Java with Spring Boot**: RESTful APIs and business logic.
- **Spring JPA**: Database interactions.

### Frontend
- **React.js**: Dynamic and responsive UI.

### Database
- **MySQL**: Data persistence.

---

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/blogging-system.git
   cd blogging-system/backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/blogging_system
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd blogging-system/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

### Database Initialization

## Usage
1. Access the application via `http://localhost:3000`.
2. Register as a new user or log in as an admin.
3. Explore blogs, create your own, and interact with other users!

---

## Project Structure

### Backend
- **Controllers**: Handle incoming requests.
- **Services**: Business logic.
- **Repositories**: Database access.
- **Models**: Entity definitions.

### Frontend
- **Components**: UI elements.
- **Pages**: Application screens.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---


---

## Contact
For inquiries, contact **Vishal Narsinh** at [vishalnarsinh@gmail.com](mailto:vishalnarsinh@gmail.com).
