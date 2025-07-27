# Express Prisma API

A modern RESTful API built with Express.js, Prisma ORM, and PostgreSQL. This project provides a complete backend solution with user management, posts, profiles, and courses functionality.

## 🚀 Features

- ✅ **RESTful API** with Express.js
- ✅ **Prisma ORM** for type-safe database operations
- ✅ **PostgreSQL** database
- ✅ **TypeScript** for better development experience
- ✅ **User Management** (CRUD operations)
- ✅ **Profile System** (One-to-One relationship)
- ✅ **Posts System** (One-to-Many relationship)
- ✅ **Courses System** (Many-to-Many relationship)
- ✅ **Database Seeding** functionality
- ✅ **Graceful Shutdown** handling
- ✅ **Error Handling** middleware

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd express_prisma
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file and add your database URL:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
   ```

4. **Setup database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database
   npx prisma db push

   # Or run migrations
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### **Root**

- `GET /` - Welcome message

#### **Users**

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

#### **Database Seeding**

- `POST /seed` - Seed database with sample data

### Request/Response Examples

#### Create User

```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "profile": {
    "bio": "Software Developer"
  }
}
```

#### Response

```json
{
  "id": "clxxxxxxxx",
  "name": "John Doe",
  "email": "john@example.com",
  "profile": {
    "id": "clxxxxxxxx",
    "bio": "Software Developer",
    "userId": "clxxxxxxxx"
  },
  "posts": [],
  "courses": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Database Schema

### Models

#### User

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  profile   Profile?
  posts     Post[]
  courses   Course[] @relation("UserCourses")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Profile (One-to-One with User)

```prisma
model Profile {
  id        String   @id @default(cuid())
  bio       String
  user      User     @relation(fields: [userId], references: [id])
  userId    String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Post (One-to-Many with User)

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Course (Many-to-Many with User)

```prisma
model Course {
  id        String   @id @default(cuid())
  title     String
  users     User[]   @relation("UserCourses")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 📁 Project Structure

```
express_prisma/
├── src/
│   ├── controllers/           # Business logic
│   │   ├── userController.ts
│   │   └── seedController.ts
│   ├── routes/               # API routes
│   │   └── userRoute.ts
│   ├── lib/                  # Utilities
│   │   └── prisma.ts         # Prisma client setup
│   ├── generated/            # Auto-generated Prisma client
│   │   └── prisma/
│   └── index.ts              # Application entry point
├── prisma/
│   └── schema.prisma         # Database schema
├── .env                      # Environment variables
├── package.json
└── README.md
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma migrate   # Run database migrations
npx prisma db seed   # Seed database with sample data

# Build & Production
npm run build        # Build for production
npm start           # Start production server
```

## 🧪 Testing the API

### Using cURL

1. **Get all users**

   ```bash
   curl http://localhost:8000/users
   ```

2. **Create a user**

   ```bash
   curl -X POST http://localhost:8000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com"}'
   ```

3. **Seed database**
   ```bash
   curl -X POST http://localhost:8000/seed
   ```

### Using Postman

Import the API endpoints into Postman and test all CRUD operations.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   ```
   Error: Can't reach database server
   ```

   **Solution**: Check your `DATABASE_URL` in `.env` file

2. **Prisma Client Not Generated**

   ```
   Error: @prisma/client did not initialize yet
   ```

   **Solution**: Run `npx prisma generate`

3. **Migration Issues**

   ```
   Error: Migration failed
   ```

   **Solution**: Reset database with `npx prisma migrate reset`

4. **Port Already in Use**
   ```
   Error: EADDRINUSE: address already in use :::8000
   ```
   **Solution**: Change PORT in index.ts or kill the process using port 8000

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Advanced open source database
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## 📞 Support

If you have any questions or need help, please open an issue in this repository.

---

**Happy Coding! 🚀**
