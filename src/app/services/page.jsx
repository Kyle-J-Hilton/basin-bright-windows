// src/app/services/page.jsx
import styles from "./services.module.css";
import Link from "next/link";

export const metadata = {
  title: "Services | Basin Bright Windows",
  description:
    "Residential & commercial window cleaning, screens & tracks, hard-water stain removal, post-construction cleanup, skylights, and more.",
};

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Our Services</h1>
        <p>
          From single-story homes to multi-tenant buildings, we deliver crystal-clear
          results with professional tools and spotless cleanup.
        </p>
      </header>

      <section className={styles.grid}>
        {/* Residential */}
        <article className={styles.card}>
          <h2>Residential Window Cleaning</h2>
          <p className={styles.lead}>
            Streak-free interior & exterior cleaning for houses, condos, and townhomes.
          </p>
          <ul className={styles.list}>
            <li>Squeegee wash with professional solution (no residue)</li>
            <li>Wipe frames, sills & ledges</li>
            <li>Detail corners & edges; remove cobwebs</li>
            <li>Optional: screens washed & reinstalled, tracks brushed/vacuumed</li>
          </ul>
          <p className={styles.note}>Recommended: every 4–6 months</p>
        </article>

        {/* Commercial */}
        <article className={styles.card}>
          <h2>Commercial Window Cleaning</h2>
          <p className={styles.lead}>
            Storefronts, offices, restaurants, and multi-unit properties—scheduled to
            minimize disruption.
          </p>
          <ul className={styles.list}>
            <li>Exterior & interior glass, doors, partitions</li>
            <li>Pure-water pole system for high, hard-to-reach glass</li>
            <li>Maintenance schedules: weekly, bi-weekly, monthly, or quarterly</li>
            <li>Flexible early/after-hours appointments</li>
          </ul>
          <p className={styles.note}>Ask about route pricing for recurring service.</p>
        </article>

        {/* Screens & Tracks */}
        <article className={styles.card}>
          <h2>Screen & Track Cleaning</h2>
          <p className={styles.lead}>
            Restore airflow and keep dirt from tracking back onto the glass.
          </p>
          <ul className={styles.list}>
            <li>Screens removed, washed, and dried</li>
            <li>Tracks brushed, vacuumed & wiped</li>
            <li>Lubricate sliders as needed</li>
          </ul>
        </article>

        {/* Hard Water */}
        <article className={styles.card}>
          <h2>Hard-Water Stain Removal</h2>
          <p className={styles.lead}>
            Mineral deposits from sprinklers & runoff removed with glass-safe methods.
          </p>
          <ul className={styles.list}>
            <li>Assessment to confirm etching vs. surface scale</li>
            <li>Professional mineral removers & non-scratch pads</li>
            <li>Sealant options to slow future buildup</li>
          </ul>
          <p className={styles.note}>
            Severity varies—final pricing depends on the condition of the glass.
          </p>
        </article>

        {/* Post-Construction */}
        <article className={styles.card}>
          <h2>Post-Construction Clean-Up</h2>
          <p className={styles.lead}>
            Safely remove paint, overspray, stickers, tape residue, and drywall dust.
          </p>
          <ul className={styles.list}>
            <li>Glass inspection and protection before scraping</li>
            <li>Non-scratch blades & solvents; edges detailed</li>
            <li>Frames, tracks & sills wiped clean</li>
          </ul>
        </article>

        {/* Skylights & Extras */}
        <article className={styles.card}>
          <h2>Skylights, Mirrors & Glass Doors</h2>
          <p className={styles.lead}>
            Brighten interiors with crystal-clear glass throughout your space.
          </p>
          <ul className={styles.list}>
            <li>Skylights (inside & out, where accessible)</li>
            <li>Large mirrors, shower glass, and patio doors</li>
            <li>Light fixture glass on request</li>
          </ul>
        </article>

        {/* Add-on */}
        <article className={styles.card}>
          <h2>Screen Repair (Add-On)</h2>
          <p className={styles.lead}>
            Small tears and loose spline repaired during your cleaning visit.
          </p>
          <ul className={styles.list}>
            <li>On-site rescreening for standard window sizes</li>
            <li>New screen mesh & spline (charcoal/gray)</li>
          </ul>
        </article>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.ctaBox}>
          <div>
            <h3>Ready for crystal-clear windows?</h3>
            <p>Get a fast, no-pressure quote—usually within the same day.</p>
          </div>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryBtn}>Request a Quote</Link>
            <Link href="/quotes" className={styles.secondaryBtn}>Instant Estimate</Link>
          </div>
        </div>
        <p className={styles.disclaimer}>
          Note: Ladders, roof access, and unusually high or difficult windows may require
          additional safety charges. We’ll confirm final pricing during scheduling.
        </p>
      </section>
    </main>
  );
}

  