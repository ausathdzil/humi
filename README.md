
# Humi

Music Moodboard Generator

**Demo**: [humi.ausathikram.com](https://humi.ausathikram.com)

Sign In with Spotify isn't supported yet for this demo because of Spotify Web API development mode limitations

Use this demo account or sign up:

- Email: `humi@test.com`

- Password:  `demo1234`

## Features

- AI-powered moodboard generation using Google's Gemini model
- Dynamic color palette generation
- Mood tag generation
- Spotify OAuth authentication
- Email and password authentication
- Save and manage personal moodboards
- User profiles with recently played and top tracks
- Share moodboards via unique links

## Tech Stack

- Framework: [Next.js](https://github.com/vercel/nextjs)
- Database: [Neon](https://github.com/neondatabase/neon)
- ORM: [Drizzle](https://github.com/drizzle-team/drizzle-orm)
- UI Library: [shadcn/ui](https://github.com/shadcn-ui/ui)
- AI: [AI SDK](https://github.com/vercel/ai)
- Authentication: [Better Auth](https://github.com/better-auth/better-auth)

## Environment Variables

Use this enviroment variables to run locally

1. `BETTER_AUTH_SECRET`: Random string, run `openssl rand 32 -base64` in your terminal

2. `BETTER_AUTH_URL`: [http://localhost:3000](http://localhost:3000)

3. `DATABASE_URL`: Neon database connection string

4. `SPOTIFY_CLIENT_ID`: Spotify developer app client ID

5. `SPOTIFY_CLIENT_SECRET`: Spotify developer app client secret

6. `GOOGLE_GENERATIVE_AI_API_KEY`: AI Model API key

## Run Locally

Clone the project

```bash
  git clone https://github.com/ausathdzil/humi
```

Go to the project directory

```bash
  cd humi
```

Install dependencies

```bash
  pnpm install
```

Run the Next.js development server:

```bash
  pnpm run dev
```
