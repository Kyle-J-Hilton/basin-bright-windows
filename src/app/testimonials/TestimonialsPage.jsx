"use client";

import { useState } from "react";
import styles from "./testimonials.module.css";

export default function TestimonialsPage() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    { name: "David R.", rating: 5, text: "The best window cleaning service I’ve ever used! My windows look amazing." },
    { name: "Sarah M.", rating: 5, text: "On-time, efficient, and super friendly. Highly recommend." },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !review) return;
    setReviews([{ name, rating: Number(rating), text: review }, ...reviews]);
    setName("");
    setRating(5);
    setReview("");
  };

  const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.headerBlock}>
          <h1>Testimonials</h1>
          <p>Read what neighbors say—and leave your own review.</p>
        </section>

        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />

            <label>Rating</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ★
                </option>
              ))}
            </select>

            <label>Your Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you like?"
              rows="4"
            />

            <button type="submit" className={styles.submitBtn}>
              Post Review
            </button>
          </form>

          <div className={styles.reviews}>
            {reviews.map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <div>
                  <strong>{r.name}</strong>
                  <p>{r.text}</p>
                </div>
                <div className={styles.stars}>{renderStars(r.rating)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
