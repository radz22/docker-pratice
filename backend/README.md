# Express TypeScript Backend with Prisma & MongoDB

A production-ready Express.js backend API built with TypeScript, Prisma ORM, and MongoDB following best practices.

## 🚀 Features

- **Express.js** with TypeScript for type-safe API development
- **Prisma ORM** for type-safe database operations with MongoDB
- **Zod** for request validation
- **Error handling** with custom error classes
- **Rate limiting** to prevent abuse
- **Security** with Helmet and CORS
- **Logging** with Morgan
- **Code quality** with ESLint and Prettier
- **Hot reload** with tsx watch mode

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma           # Prisma schema for MongoDB
├── src/
│   ├── config/                 # Configuration files
│   │   ├── database.ts         # Prisma client setup
│   │   └── env.ts              # Environment validation
│   ├── controllers/            # Route controllers
│   │   ├── health.controller.ts
│   │   ├── post.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/            # Custom middlewares
│   │   ├── error-handler.ts
│   │   ├── not-found.ts
│   │   ├── rate-limiter.ts
│   │   └── validate.ts
│   ├── routes/                 # API routes
│   │   ├── health.routes.ts
│   │   ├── post.routes.ts
│   │   └── user.routes.ts
│   ├── services/               # Business logic
│   │   ├── post.service.ts
│   │   └── user.service.ts
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── app-error.ts
│   │   ├── async-handler.ts
│   │   ├── logger.ts
│   │   └── response.ts
│   ├── validators/             # Zod schemas
│   │   ├── post.validator.ts
│   │   └── user.validator.ts
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
├── .env.example                # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Documentation
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="mongodb://localhost:27017/myapp?retryWrites=true&w=majority"
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

5. **Push database schema:**
   ```bash
   npm run prisma:push
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Other Commands
```bash
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run prisma:studio # Open Prisma Studio
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API and database health

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## 📝 Request Examples

### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }'
```

### Create Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content",
    "authorId": "USER_ID_HERE"
  }'
```

## 🏗️ Architecture

### Layered Architecture
1. **Routes** - Define API endpoints
2. **Controllers** - Handle HTTP requests/responses
3. **Services** - Business logic and database operations
4. **Validators** - Request validation with Zod
5. **Middlewares** - Cross-cutting concerns (auth, error handling, etc.)

### Error Handling
- Custom error classes (`AppError`, `NotFoundError`, etc.)
- Global error handler middleware
- Async error handling with `asyncHandler`

### Validation
- Zod schemas for type-safe validation
- Automatic validation middleware
- Clear error messages

## 🔒 Security

- **Helmet** - Secure HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Prevent API abuse
- **Input Validation** - Zod schema validation

## 🧪 Best Practices

- ✅ Clean separation of concerns
- ✅ Type-safe with TypeScript
- ✅ Centralized error handling
- ✅ Environment validation
- ✅ Consistent API responses
- ✅ Request validation
- ✅ Secure coding practices
- ✅ Code formatting and linting

## 📚 Technologies

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **MongoDB** - Database
- **Zod** - Schema validation
- **Helmet** - Security middleware
- **Morgan** - HTTP logger
- **tsx** - TypeScript execution

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Add validation for all inputs
4. Handle errors properly
5. Format code with Prettier
6. Lint with ESLint

## 📄 License

MIT

