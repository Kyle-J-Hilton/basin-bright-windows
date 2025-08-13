"use client";

import { useEffect, useState } from "react";
import styles from "./testimonials.module.css";

const seed = [
  { name: "David R.", rating: 5, text: "The best window cleaning service I’ve ever used! My windows look amazing." },
  { name: "Sarah M.", rating: 5, text: "On-time, efficient, and super friendly. Highly recommend." },
];

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState(seed);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  // Load saved reviews (keeps them visible after refresh)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bb_reviews") || "[]");
      if (saved.length) setReviews(prev => [...saved, ...prev]);
    } catch {}
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "submitting", msg: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const rating = Number(payload.rating || 5);

    // optimistic UI (store locally)
    const newReview = { name: payload.name || "Anonymous", rating, text: payload.text || "" };
    setReviews(prev => [newReview, ...prev]);
    try {
      const existing = JSON.parse(localStorage.getItem("bb_reviews") || "[]");
      localStorage.setItem("bb_reviews", JSON.stringify([newReview, ...existing]));
    } catch {}

    // send to your inbox via Resend (optional but recommended)
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();
      setStatus({ state: "success", msg: "Thanks for your review!" });
      form.reset();
    } catch {
      setStatus({ state: "error", msg: "Saved locally. Couldn’t send to the server." });
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.headerBlock}>
        <h1>Testimonials</h1>
        <p>Read what neighbors say—and leave your own review.</p>
      </section>

      <section className={styles.grid}>
        <form className={styles.card} onSubmit={onSubmit}>
          <h2 className={styles.h2}>Leave a Review</h2>

          <label className={styles.field}>
            <span>Name</span>
            <input name="name" type="text" placeholder="Your name" />
          </label>

          <label className={styles.field}>
            <span>Rating</span>
            <select name="rating" defaultValue="5">
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} ★</option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Your Review</span>
            <textarea name="text" rows={5} required placeholder="What did you like?" />
          </label>

          <button className={styles.primaryBtn} disabled={status.state === "submitting"}>
            {status.state === "submitting" ? "Submitting…" : "Post Review"}
          </button>

          {status.state === "success" && <p className={styles.success}>✅ {status.msg}</p>}
          {status.state === "error" && <p className={styles.error}>⚠️ {status.msg}</p>}
        </form>

        <ul className={styles.list}>
          {reviews.map((r, i) => (
            <li key={i} className={styles.review}>
              <div className={styles.reviewHead}>
                <strong>{r.name}</strong>
                <span className={styles.stars} aria-label={`${r.rating} out of 5 stars`}>
                  {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
