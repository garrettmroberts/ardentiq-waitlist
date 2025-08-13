import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import nodemailer from "nodemailer";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_EMAILS_PER_WINDOW = 3; // Maximum emails per IP per hour

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_EMAILS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 1000);

// Validate required environment variables
const requiredEnvVars = [
  "POSTGRES_URL",
  "DATABASE_URL",
  "AWS_SES_SMTP_USERNAME",
  "AWS_SES_SMTP_PASSWORD",
  "SENDER_EMAIL",
];
const hasValidDbUrl = requiredEnvVars
  .slice(0, 2)
  .some((envVar) => process.env[envVar]);
const hasValidEmailConfig = requiredEnvVars
  .slice(2)
  .every((envVar) => process.env[envVar]);

if (!hasValidDbUrl) {
  throw new Error(
    `Missing required environment variables: ${requiredEnvVars
      .slice(0, 2)
      .join(" or ")}`
  );
}

if (!hasValidEmailConfig) {
  throw new Error(
    `Missing required email environment variables: ${requiredEnvVars
      .slice(2)
      .join(", ")}`
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

// Configure AWS SES SMTP transporter
const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_SMTP_USERNAME,
    pass: process.env.AWS_SES_SMTP_PASSWORD,
  },
});

// Welcome email template
const createWelcomeEmail = (email: string) => ({
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: "Welcome to ArdentIQ! 🚀",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ArdentIQ</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
        }
        .header { 
          text-align: center; 
          padding: 30px 0; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          border-radius: 10px 10px 0 0;
        }
        .content { 
          padding: 30px; 
          background: #f8f9fa; 
          border-radius: 0 0 10px 10px;
        }
        .button { 
          display: inline-block; 
          padding: 12px 24px; 
          background: #007bff; 
          color: white; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 20px 0;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #666; 
          font-size: 14px;
        }
        .highlight { 
          background: #fff3cd; 
          padding: 15px; 
          border-radius: 5px; 
          border-left: 4px solid #ffc107;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 Welcome to ArdentIQ!</h1>
        <p>You're now on the waitlist for the future of knowledge management</p>
      </div>
      
      <div class="content">
        <h2>Thank you for joining us!</h2>
        
        <p>Hi there,</p>
        
        <p>We're excited to have you on the ArdentIQ waitlist! You're now among the first to know when we launch our AI-powered knowledge management platform.</p>
        
        <div class="highlight">
          <strong>What's next?</strong><br>
          We'll notify you as soon as ArdentIQ is ready for early access. You'll be among the first to experience how AI can transform your document management.
        </div>
        
        <h3>What ArdentIQ will offer:</h3>
        <ul>
          <li><strong>Smart Document Processing:</strong> Upload PDFs, docs, and data sources with instant AI-powered knowledge base creation</li>
          <li><strong>Lightning Fast Retrieval:</strong> Get precise answers from your documents in seconds, not hours</li>
          <li><strong>Enterprise Security:</strong> Data securely segmented within our vector database</li>
          <li><strong>Team Collaboration:</strong> Share knowledge across teams with role-based access</li>
        </ul>
        
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Visit <a href="https://ardentiq.ai">ardentiq.ai</a> to learn more</li>
          <li>Follow us on LinkedIn for updates and insights</li>
          <li>Share with colleagues who might be interested</li>
        </ul>
        
        <p>We're working hard to bring you a platform that will revolutionize how your organization handles knowledge and documents.</p>
        
        <p>Best regards,<br>
        <strong>The ArdentIQ Team</strong></p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} ArdentIQ LLC. All rights reserved.</p>
        <p>This email was sent to ${email}. If you didn't sign up for our waitlist, you can safely ignore this email.</p>
      </div>
    </body>
    </html>
  `,
  text: `
Welcome to ArdentIQ! 🚀

Thank you for joining us!

Hi there,

We're excited to have you on the ArdentIQ waitlist! You're now among the first to know when we launch our AI-powered knowledge management platform.

What's next?
We'll notify you as soon as ArdentIQ is ready for early access. You'll be among the first to experience how AI can transform your document management.

What ArdentIQ will offer:
- Smart Document Processing: Upload PDFs, docs, and data sources with instant AI-powered knowledge base creation
- Lightning Fast Retrieval: Get precise answers from your documents in seconds, not hours
- Enterprise Security: Data securely segmented within our vector database
- Team Collaboration: Share knowledge across teams with role-based access

In the meantime, feel free to:
- Visit ardentiq.ai to learn more
- Follow us for updates and insights
- Share with colleagues who might be interested

We're working hard to bring you a platform that will revolutionize how your organization handles knowledge and documents.

Best regards,
The ArdentIQ Team

© ${new Date().getFullYear()} ArdentIQ LLC. All rights reserved.
This email was sent to ${email}. If you didn't sign up for our waitlist, you can safely ignore this email.
  `,
});

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Get client IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const client = await pool.connect();

    try {
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

      // Send welcome email
      try {
        const welcomeEmail = createWelcomeEmail(email);
        await transporter.sendMail(welcomeEmail);
        console.log(`Welcome email sent successfully to ${email}`);
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the entire request if email fails
      }

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
