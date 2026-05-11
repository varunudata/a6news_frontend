# A6News - Frontend

This is the frontend application for **A6News**, a modern news portal and Content Management System (CMS). Built with the Next.js App Router, it provides a fast, server-side rendered, and SEO-friendly public interface for reading news, alongside a secure administrative dashboard for managing content.

🔗 **[Backend Repository](https://github.com/varunudata/a6news_backend.git)**

##  Features

- **Public News Site:**
  - Modern, responsive homepage with Hero, Latest News, and Category sections.
  - Category-based article browsing.
  - Detailed article pages supporting thumbnails, image galleries, tags, and view counters.
- **Admin Dashboard:**
  - Secure, JWT-based authentication system.
  - Manage articles (Create, Edit, Delete) with Draft/Published states.
  - Manage categories and user accounts.
- **UI & UX:**
  - Fully responsive design using Tailwind CSS v4.
  - Interactive notifications with React Toastify.
  - Beautiful, accessible icons using Lucide React.

##  Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)

##  Directory Structure

```text
client/
├── app/
│   ├── (auth)/         # Login & Registration pages
│   ├── (site)/         # Public pages (Categories, Posts)
│   ├── admin/          # Protected Admin Dashboard
│   ├── components/     # Reusable React components
│   ├── globals.css     # Global styling
│   └── layout.js       # Root layout component
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

##  Getting Started

### Prerequisites

- Node.js (v18.x or newer recommended)
- npm, yarn, or pnpm
- The A6News Backend server running locally.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <REPLACE_WITH_FRONTEND_REPO_URL>
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root of the project to configure your environment variables:
   ```bash
   touch .env.local
   ```
   Add the following variables:
   ```env
   # Replace with your backend API URL if different
   NEXT_PUBLIC_API_URL="http://localhost:4004/api"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
