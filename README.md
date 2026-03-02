# QuickHire Website

Frontend for the QuickHire job portal, built with Next.js 15, Tailwind CSS v4, and TypeScript.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Notifications**: react-hot-toast
- **Validation**: Zod
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── app/
│   ├── (auth)/             # Auth pages (login, signup)
│   ├── (main)/             # Public pages
│   │   ├── page.tsx        # Homepage (hero, categories, featured jobs)
│   │   └── jobs/
│   │       ├── page.tsx    # Job listings with search & filters
│   │       └── [id]/       # Job details + apply form
│   ├── admin/              # Admin dashboard
│   │   ├── layout.tsx      # Sidebar layout
│   │   ├── page.tsx        # Job management (CRUD, stats, filters)
│   │   ├── applications/   # Application review
│   │   └── jobs/new/       # Post new job form
│   ├── layout.tsx          # Root layout (fonts, Toaster)
│   └── globals.css         # Global styles
├── components/
│   ├── common/             # Badge, Button, etc.
│   ├── layout/             # Header, Footer
│   └── ui/                 # HeroSection, CategoriesSection, etc.
├── features/               # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities
│   └── api.ts              # Centralized fetch wrapper
├── services/               # API service layer
└── types/                  # TypeScript type definitions
```

## Pages

| Route                 | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `/`                   | Homepage — hero, companies, categories, jobs          |
| `/jobs`               | Job listings with search, location & category filters |
| `/jobs/:id`           | Job details + application form                        |
| `/login`              | Login page                                            |
| `/signup`             | Signup page                                           |
| `/admin`              | Admin dashboard — job management with stats           |
| `/admin/jobs/new`     | Post a new job form                                   |
| `/admin/applications` | Review applicant submissions                          |

## Features

- **Centralized API utility** — `src/lib/api.ts` reads the base URL from `.env.local`, no hardcoded URLs
- **Admin dashboard** — Stat cards, inline search + category filter, skeleton loading, edit modal with smooth transitions, delete with confirmation
- **Job filtering** — Instant category filter, URL-synced search params, active filter pills with remove buttons
- **Loading states** — Skeleton table rows (admin) and skeleton job cards (public) instead of plain spinners
- **Toast notifications** — Success/error feedback via react-hot-toast
- **Responsive design** — Mobile-first layout with sticky admin sidebar

## Getting Started

### Prerequisites

- Node.js (v18+)
- QuickHire backend running (default: `http://localhost:5000`)

### Installation

```bash
# Clone and enter the directory
cd quickhire-website

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Change this to your backend URL for staging/production.

### Running

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

The app starts at `http://localhost:3000` by default.
