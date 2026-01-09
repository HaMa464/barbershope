# Premium Barber Booking System

A modern barber shop appointment booking and management system built with React, TypeScript, and Supabase. Features full support for English, Kurdish Sorani, and Arabic languages.

## Features

- Appointment booking system with barber and service selection
- Real-time appointment dashboard with statistics
- Multi-language support (English, Kurdish Sorani, Arabic)
- Appointment cancellation functionality
- Responsive design for all devices
- RTL (right-to-left) text support for Arabic and Kurdish

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **Deployment:** Static hosting (Vercel, Netlify, GitHub Pages)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/barber-booking.git
cd barber-booking
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Getting Supabase Credentials

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Copy your project URL and anon key from the project settings
4. Paste them into your `.env` file

### Database Setup

The database schema and initial data are automatically created through migrations. When you clone and set up the project with the correct Supabase credentials, the tables will be created automatically.

### Running the Application

**Development:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── BookingPage.tsx      # Main booking interface
│   ├── DashboardPage.tsx    # Appointment dashboard and management
│   ├── Header.tsx           # Navigation and language switcher
│   └── Footer.tsx           # Footer with credits
├── contexts/
│   └── LanguageContext.tsx  # Multi-language support
├── lib/
│   └── supabase.ts          # Supabase client and types
├── App.tsx                  # Main app component
└── index.css               # Global styles
```

## Services

The system comes with two default services:

- **Beard Trim** (ردێن کردن / تشذيب اللحية) - 5,000 IQD
- **Hair + Beard** (قژ + ردێن / شعر + لحية) - 10,000 IQD

Barbers:
- Omer
- Ali

## Database Schema

### Tables

- **barbers**: Store barber information
- **services**: Service offerings with multilingual names and pricing
- **appointments**: Customer appointments with date/time slots

### Row Level Security

All tables have RLS enabled with public read/insert/delete permissions for the booking system.

## Languages

The application supports:
- **English** (EN)
- **Kurdish Sorani** (KU) - ردێن for beard
- **Arabic** (AR) - لحية for beard

Language selection is available in the header and automatically switches the UI and all text.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub (with correct environment variables)
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify

1. Build the project locally: `npm run build`
2. Connect your GitHub repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy automatically

### Environment Variables for Production

When deploying, ensure you set the following environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

## Important Notes

- **Never commit your `.env` file to GitHub** - Use `.env.example` as a template
- Keep your Supabase credentials secure
- Only share the `.env.example` file (without actual values) with your team
- Test the application locally with your Supabase instance before deploying

## Development

### Code Style

- Uses ESLint for code quality
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Quick Start for GitHub

1. Clone: `git clone <repo-url>`
2. Install: `npm install`
3. Setup: `cp .env.example .env` and add your Supabase credentials
4. Run: `npm run dev`
5. Build: `npm run build `

## Troubleshooting

**Issue: "Cannot connect to Supabase"**
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Ensure `.env` file exists and has the correct values
- Verify your Supabase project is active

**Issue: "Database tables not found"**
- Make sure you have the correct Supabase credentials
- The migrations will run automatically when needed
- Check Supabase dashboard to see if tables exist

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

Made by Mohamad Mofaq
