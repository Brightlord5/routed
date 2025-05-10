# Dubai Ride Share

A modern carpooling application designed specifically for Dubai, with integration to public transport options.

## Features

- **Find a Ride**: Search for available rides with various sorting options:
  - Fastest routes
  - Cheapest rides
  - Public transit connections

- **Post a Ride**: Easily post your ride details for others to join

- **Transit Integration**: Discover public transport options to continue your journey after ride ends

- **Persistent Storage**: All rides are stored in SQLite database

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- SQLite (via better-sqlite3)
- Shadcn UI Components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Database

The application uses SQLite for data persistence. Rides and transit suggestions are stored in a local database (`rides.db`).

## UI Features

- Modern, minimalist design
- Transit suggestions for multi-modal travel
- Interactive map visualization
- Responsive mobile-first layout

## License

MIT
