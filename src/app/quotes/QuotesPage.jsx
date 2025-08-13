"use client";

import { useMemo, useState } from "react";
import styles from "./quotes.module.css";

const RATE = 0.1144; // dollars per square foot

export default function QuotesPage() {
  const [sqft, setSqft] = useState("");

  const price = useMemo(() => {
    const n = Number(String(sqft).replace(/,/g, ""));
    if (!Number.isFinite(n) || n <= 0) return 0;
    return n * RATE;
  }, [sqft]);

  const fmt = (v) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  return (
    <main className={styles.page}>
      <section className={styles.headerBlock}>
        <h1>Instant Quote</h1>
        <p>Enter your home’s square footage. We’ll estimate at <strong>{fmt(RATE)}</strong> per sq ft.</p>
      </section>

      <section className={styles.card}>
        <label className={styles.field}>
          <span>Square Footage</span>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g., 2200"
            value={sqft}
            onChange={(e) => setSqft(e.target.value.replace(/[^\d]/g, ""))}
          />
        </label>

        <div className={styles.totalRow}>
          <span>Estimated Price</span>
          <strong className={styles.total}>{fmt(price)}</strong>
        </div>

        <p className={styles.note}>
          This is an estimate for exterior + standard cleaning. Exact pricing may vary based on stories,
          window count, screens, access, and hard-water removal.
        </p>

        <div className={styles.actions}>
          <a href="/contact" className={styles.primaryBtn}>Request a Detailed Quote</a>
          <a href="/testimonials" className={styles.secondaryBtn}>Read Reviews</a>
        </div>

      </section>
    </main>
  );
}
