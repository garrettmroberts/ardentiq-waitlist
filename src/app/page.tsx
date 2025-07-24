"use client";
import styles from "./Landing.module.css";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setToast({ message: "", type: null });
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: "Thank you! You're on the waitlist.", type: "success" });
        setEmail("");
      } else {
        setToast({ message: data.error || "Something went wrong.", type: "error" });
      }
    } catch (err) {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: "", type: null }), 3500);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>ArdentIQ <span className={styles.llc}>LLC</span></h1>
        <p className={styles.tagline}>Empowering Your Business Data with AI</p>
        <div className={styles.heroScroll}>
          <div className={styles.heroCards}>
            <div className={styles.heroCard} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80')" }}>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3>AI-Powered Insights</h3>
                <p>Unlock trends and answers from your business data with natural language queries.</p>
              </div>
            </div>
            <div className={styles.heroCard} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80')" }}>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3>Secure Data Access</h3>
                <p>Enterprise-grade security ensures your information is always protected.</p>
              </div>
            </div>
            <div className={styles.heroCard} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')" }}>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3>For Growing Teams</h3>
                <p>Designed for small and mid-sized businesses—no IT department required.</p>
              </div>
            </div>
            <div className={styles.heroCard} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80')" }}>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3>Instant Answers</h3>
                <p>Get the information you need, when you need it, with a simple chat.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>Unlock Your Data. Unlock Your Potential.</h2>
          <p>
            ArdentIQ is building a secure, AI-powered chat interface that enables small and mid-sized businesses to access, analyze, and interact with their internal data—instantly and intuitively.
          </p>
        </section>
        <section className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Secure by Design</h3>
            <p>
              Your data stays yours. Our platform uses enterprise-grade security to ensure your information is always protected.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>Conversational AI</h3>
            <p>
              Ask questions, get insights. Our natural language chat interface makes complex data accessible to everyone on your team.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3>For Growing Businesses</h3>
            <p>
              Designed for small and mid-sized organizations—no IT department required. Get up and running in minutes.
            </p>
          </div>
        </section>
        <section className={styles.ctaSection}>
          <h2>Join the waitlist</h2>
          <p>
            We are currently conducting trials with select businesses. Join the waitlist and we’ll let you know when an official release is announced.
          </p>
          <form className={styles.waitlistForm} onSubmit={handleSubmit} autoComplete="off">
            <input
              type="email"
              className={styles.waitlistInput}
              placeholder="Your email for the waitlist"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              aria-label="Email address"
            />
            <button className={styles.waitlistButton} type="submit" disabled={loading || !email}>
              {loading ? "Sending..." : "Join Waitlist"}
            </button>
          </form>
          {toast.message && (
            <div
              className={
                styles.toast +
                " " +
                (toast.type === "success" ? styles.toastSuccess : styles.toastError)
              }
              role="alert"
              aria-live="polite"
            >
              {toast.message}
            </div>
          )}
        </section>
      </main>
      <footer className={styles.footer}>
        <div style={{ marginTop: "2rem" }}>
          &copy; {new Date().getFullYear()} ArdentIQ LLC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
