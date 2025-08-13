"use client";
import { useMemo, useState, useEffect } from "react";
import styles from "./quotes.module.css";

const RATE = 0.1144;

export default function QuotesPage() {
  const [sqft, setSqft] = useState("");
  const [shimmer, setShimmer] = useState(false);

  const n = useMemo(() => Number(String(sqft).replace(/,/g, "")) || 0, [sqft]);
  const price = useMemo(() => (n <= 0 ? 0 : n * RATE), [n]);

  // ±8% range for realism
  const low  = Math.max(0, price * 0.92);
  const high = price * 1.08;

  useEffect(() => {
    if (n > 0) {
      setShimmer(true);
      const t = setTimeout(() => setShimmer(false), 1200);
      return () => clearTimeout(t);
    }
  }, [price, n]);

  const fmt = v => v.toLocaleString("en-US",{ style:"currency", currency:"USD", maximumFractionDigits:2 });

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.headerBlock}>
          <h1>Instant Estimate</h1>
          <p>Estimated rate: <strong>${RATE.toFixed(2)}/sq&nbsp;ft</strong> (exterior + standard clean).</p>
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
              aria-describedby="estimate-caption"
            />
          </label>

          {/* Result panel under input */}
          <div className={styles.result} aria-live="polite" role="status">
            <div className={styles.priceRow}>
              <div className={`${styles.bigPrice} ${shimmer ? styles.shimmer : ""}`}>{fmt(price)}</div>
              {n > 0 && <div className={styles.range}>{fmt(low)}–{fmt(high)}</div>}
            </div>
            <div id="estimate-caption" className={styles.caption}>Estimate • exterior + standard cleaning</div>

            <div className={styles.ctaRow}>
              <a href="/contact" className={styles.primaryBtn}>Request a Detailed Quote</a>
              <a href="/testimonials" className={styles.secondaryBtn}>Read Reviews</a>
            </div>
          </div>

          <p className={styles.note}>
            This is an estimate. Exact pricing may vary based on stories, window count, screens, access, and hard-water removal.
          </p>
        </section>
      </div>
    </main>
  );
}