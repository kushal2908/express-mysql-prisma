# Express MySQL Prisma

**This repository contains a Node.js backend project built with Express, MySQL, and Prisma ORM. It demonstrates a basic setup for creating a RESTful API, connecting to a MySQL database, and managing schema with Prisma.**

### Features

- **Express:** Lightweight, fast, and minimalist backend framework.
- **Prisma:** Type-safe ORM for MySQL integration, migrations, and schema management.
- **MySQL:** Database for handling relational data.
- **TypeScript**: Ensures type safety and better development experience.

### Prerequisites

- Node.js (>=14.x)
- MySQL
- Prisma CLI `npm install prisma --global`

### Prerequisites

1.  Clone the repository:

```bash
git clone https://github.com/kushal2908/express-mysql-prisma.git
cd express-mysql-prisma
```

2. Install dependencies:

```bash
npm install
```

5. Declare prisma datasource

```bash
npx prisma init --datasource-provider mysql
```

4. Run Migrations:

```bash
npm run migrate:dev
```

5. Start the server

```bash
npm run dev
```

The server will start on http://localhost:3000.

###Folder Structure

- `src/`: Contains Express server and route definitions.
- `prisma/`: Prisma schema and migration files.

### License

This project is open-source and available under the MIT License.
