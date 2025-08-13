import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Validate required environment variables
const requiredEnvVars = ["POSTGRES_URL", "DATABASE_URL"];
const hasValidDbUrl = requiredEnvVars.some((envVar) => process.env[envVar]);

if (!hasValidDbUrl) {
  throw new Error(
    `Missing required environment variables: ${requiredEnvVars.join(" or ")}`
  );
}

// Use environment variables for DB connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Test database connection
    const client = await pool.connect();

    try {
      // Create table if it doesn't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS waitlist_emails (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `);

      // Insert email
      await client.query(
        "INSERT INTO waitlist_emails (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
        [email]
      );

      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Email API error:", err);

    // Handle specific database connection errors
    if (err instanceof Error) {
      if (
        err.message.includes("ECONNREFUSED") ||
        err.message.includes("ENOTFOUND")
      ) {
        return NextResponse.json(
          { error: "Database connection failed" },
          { status: 503 }
        );
      }
      if (err.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Database request timeout" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
