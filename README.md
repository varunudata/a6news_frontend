📰 A6News — Modern Full-Stack News & Infra Updates Platform
Built with Next.js 14 (App Router), Node.js/Express, Prisma ORM, PostgreSQL, Cloudinary, JWT Auth, TailwindCSS
🚀 Overview

A6News is a full-stack news publishing platform where admins can upload articles, add categories, manage posts, and provide infrastructure updates.
Users can browse posts, filter by category, view latest posts, and read detailed articles.

This project contains:

Frontend (Next.js)

Modern UI built using Next.js App Router

Fully responsive news homepage

Category-based browsing

Rich single post page with related posts

Hero slider, latest news, auto-curated category cards

Cloudinary image previews

Admin panel UI included

JWT-based login and protected admin routes

Backend (Node.js + Express)

Modular, clean architecture

Prisma ORM connected with PostgreSQL

REST API for posts and categories

Authentication + admin authorization

Cloudinary media support

Pagination, sorting, category filtering

📁 Folder Structure
Frontend — /client
app/
│── page.js                      # Home page
│
├── components/
│   ├── layout/                  # Navbar / Footer / Posts UI
│   ├── home/                    # Hero / Latest / Category UI
│   └── ...
│
├── (site)/
│   ├── posts/[slug]/page.js     # Single post page
│   └── category/[id]/page.js    # Category with pagination
│
└── admin/
    ├── posts/ (CRUD pages)
    ├── categories/
    └── components/              # AdminNavbar, AdminSidebar etc.

Backend — /server
controllers/
│── postController.js
│── categoryController.js
│── authController.js

middlewares/
│── authMiddleware.js
│── adminMiddleware.js

routes/
│── postRoutes.js
│── categoryRoutes.js
│── authRoutes.js

prisma/
│── schema.prisma

utils/
│── jwt.js
│── cloudinary.js

🧩 Key Features
🌐 Public Website

Stunning infrastructure-themed design

Hero carousel slider

Latest posts from each category

Category-wise posts browsing

Pagination on category pages

Fast-loading UI

SEO-friendly post URLs (slug-based)

Related posts section

🔐 Authentication

JWT-based secure login

Admin-only protected API routes

Auto token expiration

🛠️ Admin Dashboard

Create, edit, delete posts

Create and delete categories

Upload thumbnail + gallery images to Cloudinary

Rich text post content

Auto-generated slugs

Category selection dropdown

☁️ Cloudinary Support

Thumbnail upload

Gallery upload

Live preview

Loading animations

🗃️ Database + Prisma

PostgreSQL powered

Prisma ORM

Clean schema for:

User

Category

Post

Pagination + sorting + filtering implemented

🔌 API Endpoints
Categories
POST    /api/categories               (admin)
GET     /api/categories
GET     /api/categories/:id
DELETE  /api/categories/:id          (admin)

Posts
POST    /api/posts                    (admin)
GET     /api/posts
GET     /api/posts/latest-per-category
GET     /api/posts/id/:id
GET     /api/posts/:slug
PUT     /api/posts/:id               (admin)
DELETE  /api/posts/:id               (admin)

🛠️ Tech Stack
Frontend

Next.js 14 (App Router)

React

TailwindCSS

Cloudinary Upload API

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

JSON Web Tokens (JWT)

Dev Tools

Vercel / Render for deployment

ESLint + Prettier

Postman for API testing

⚙️ Environment Variables
Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:4004
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=xxxx

Backend
DATABASE_URL=postgresql://...
SECRET_KEY=your-jwt-secret-key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

▶️ Running the Project Locally
1. Install dependencies

Frontend:

cd client
npm install


Backend:

cd server
npm install

2. Configure Environment Variables

Create .env in both client and server folders
(Add the variables shown above)

3. Run Backend
cd server
npx prisma migrate dev
npm run dev

4. Run Frontend
cd client
npm run dev

🎨 Screenshots

(Add after deployment)

🚢 Deployment

Frontend → Vercel
Backend → Render / Railway
Database → PostgreSQL

👨‍💻 Author

Varun Udata
Full-Stack Developer | Rishihood University
Tech: Web Dev · Python · React · Node · Prisma · Cloudinary

⭐ Like the Project?

If you found it useful, star the repository! ⭐
