"use client";

import { useState } from "react";
import styles from "./contact.module.css";
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "submitting", msg: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");

      setStatus({ state: "success", msg: "Thanks! We’ll get back to you shortly." });
      form.reset();
    } catch (err) {
      setStatus({
        state: "error",
        msg: "Something went wrong. Please try again or call us.",
      });
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.headerBlock}>
        <h1>Get a Free Quote</h1>
        <p>Tell us about your home or business, and we’ll reach out ASAP.</p>
      </section>

      <form className={styles.form} onSubmit={onSubmit}>
        {/* Honeypot (must stay empty) */}
        <input type="text" name="company" className={styles.hp} tabIndex={-1} autoComplete="off" />

        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span>Name*</span>
            <input name="name" type="text" required autoComplete="name" />
          </label>

          <label className={styles.field}>
            <span>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
        </div>

        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span>Email*</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>

          <label className={styles.field}>
            <span>Property Type</span>
            <select name="propertyType" defaultValue="">
              <option value="" disabled>Choose one…</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </label>
        </div>

        <label className={styles.field}>
          <span>Address (optional)</span>
          <input name="address" type="text" autoComplete="street-address" />
        </label>

        <label className={styles.field}>
          <span>How can we help?</span>
          <textarea
            name="message"
            rows={6}
            required
            placeholder="E.g., number of stories, interior/exterior, screens, hard-water stains…"
          />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.primaryBtn} disabled={status.state === "submitting"}>
            {status.state === "submitting" ? "Sending…" : "Send Request"}
          </button>
          <p className={styles.alt}>
            Prefer to call? <Link href="tel:+15551234567">(555) 123-4567</Link>
          </p>
        </div>

        {status.state === "success" && <p className={styles.success}>✅ {status.msg}</p>}
        {status.state === "error" && <p className={styles.error}>⚠️ {status.msg}</p>}
      </form>
    </main>
  );
}
