# ArdentIQ - Waitlist Website

Landing page and waitlist collection website for ArdentIQ, an AI-powered knowledge management platform that transforms documents into intelligent answers for small and mid-sized organizations.

## Overview

This repository contains the waitlist website for ArdentIQ. The platform enables businesses to upload PDFs, documents, and data sources, instantly creating searchable knowledge bases. Our AI provides lightning-fast retrieval, delivering precise answers from your documents in seconds rather than hours of manual searching.

## What This Repository Contains

- **Waitlist Landing Page** - Hero section, features overview, and CTA
- **Email Collection System** - API endpoint for collecting waitlist signups
- **Responsive Design** - Mobile-first design with modern UI/UX
- **Marketing Website** - Company information and product preview

**🌐 Live Site**: [ardentiq.ai](https://ardentiq.ai)

## Features (Platform Preview)

- **Smart Document Processing** - Upload PDFs, docs, and data sources with instant AI-powered knowledge base creation
- **Lightning Fast Retrieval** - Get precise answers from documents in seconds, not hours
- **Enterprise Security** - Data securely segmented within vector database ensuring complete isolation between organizations
- **Team Collaboration** - Share knowledge across teams with role-based access and collaborative workspaces

## Benefits (Platform Preview)

- No technical setup required - drag, drop, done
- Scales with your organization from 5 to 1000+ employees
- Integrates with your existing tools and workflows
- Transparent pricing with no hidden costs

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, SCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL for waitlist email storage
- **Styling**: Custom SCSS architecture with responsive design
- **Deployment**: Vercel-ready with environment variable configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Environment variables configured

### Environment Variables

```bash
POSTGRES_URL=your_postgres_connection_string
# or
DATABASE_URL=your_database_connection_string
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/garrettmroberts/ardentiq-waitlist
cd ardentiq-waitlist
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your database credentials
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ardentiq-waitlist/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes (email collection)
│   │   ├── components/     # React components (landing page)
│   │   └── constants/      # Application constants
│   └── styles/             # SCSS architecture
│       ├── abstracts/      # Variables, mixins, functions
│       ├── base/           # Reset, typography, base styles
│       ├── components/     # Component-specific styles
│       ├── layout/         # Layout styles
│       └── utilities/      # Helper classes
├── public/                 # Static assets
└── package.json
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

- TypeScript for type safety
- SCSS with 7-1 architecture pattern
- Responsive design with mobile-first approach
- Component-based architecture

## API Endpoints

### POST `/api/email`
Collects email addresses for the ArdentIQ waitlist.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved by ArdentIQ LLC.

## Contact

- **Company**: ArdentIQ LLC
- **Website**: [ardentiq.com](https://ardentiq.com)
- **Email**: [contact@ardentiq.com](mailto:contact@ardentiq.com)

---

**Note**: This repository contains only the waitlist website. The full ArdentIQ platform is a separate application.

Built with ❤️ by the ArdentIQ team
