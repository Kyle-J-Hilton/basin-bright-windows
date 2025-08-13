"use client";
import { useState } from "react";
import styles from "./contact.module.css";
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [errs, setErrs] = useState({});

  function formatPhone(v) {
    const d = v.replace(/\D/g, "").slice(0,10);
    if (d.length < 4) return d;
    if (d.length < 7) return `(${d.slice(0,3)}) ${d.slice(3)}`;
    return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "submitting", msg: "" });
    setErrs({});

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // simple validation
    const errors = {};
    if (!data.name) errors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "")) errors.email = "Enter a valid email.";
    if (Object.keys(errors).length) {
      setStatus({ state: "idle", msg: "" });
      setErrs(errors);
      return;
    }

    try {
      const res = await fetch("/api/contact",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error();
      setStatus({ state:"success", msg:"Thanks! We’ll get back to you shortly." });
      form.reset();
    } catch {
      setStatus({ state:"error", msg:"Something went wrong. Please try again or call us." });
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.headerBlock}>
          <h1>Get a Free Quote</h1>
          <p>Tell us about your home or business, and we’ll reach out ASAP.</p>
        </section>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <input type="text" name="company" className={styles.hp} tabIndex={-1} autoComplete="off" />

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span>Name*</span>
              <input name="name" type="text" required aria-invalid={!!errs.name} />
              {errs.name && <div className={styles.errorText}>{errs.name}</div>}
            </label>

            <label className={styles.field}>
              <span>Phone</span>
              <input
                name="phone" type="tel" inputMode="tel"
                onChange={(e)=>{ e.currentTarget.value = formatPhone(e.currentTarget.value); }}
                placeholder="(555) 123-4567"
              />
            </label>
          </div>

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span>Email*</span>
              <input name="email" type="email" required aria-invalid={!!errs.email} />
              {errs.email && <div className={styles.errorText}>{errs.email}</div>}
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
            <textarea name="message" rows={6} required placeholder="E.g., number of stories, interior/exterior, screens, hard-water stains…" />
          </label>

          <div className={styles.actions}>
            <button type="submit" className={styles.primaryBtn} disabled={status.state === "submitting"}>
              {status.state === "submitting" ? "Sending…" : "Request Your Free Quote"}
            </button>
            <span className={styles.trust}>No spam. We usually reply within the same day.</span>
            <p className={styles.alt}>
              Prefer to call? <Link href="tel:+15551234567">(555) 123-4567</Link>
            </p>
          </div>

          {status.state === "success" && <p className={styles.success}>✅ {status.msg}</p>}
          {status.state === "error" &&   <p className={styles.error}>⚠️ {status.msg}</p>}
        </form>
      </div>
    </main>
  );
}
