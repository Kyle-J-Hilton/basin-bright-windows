// src/app/page.js
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero} role="banner" aria-label="Hero">
        <div className={styles.herodiv}>
          <h1>Crystal Clear Results Every Time</h1>

          {/* If you want a separate contact page, use /contact (you already have that route) */}
          <Link href="/contact" className={styles.ctaButton}>
            <Link href="/quotes" className={styles.link}>Get a Free Quote</Link>
          </Link>

          {/* If you’d rather scroll to a contact section on this page, 
              change href to "#contact" and add an element with id="contact" below. */}
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services} aria-labelledby="services-heading">
        <h2 id="services-heading">Our Services</h2>

        {/* List = better semantics + screen readers */}
        <ul className={styles.serviceGrid}>
          <li className={styles.serviceCard}>
            {/* optional icon slot: <span className={styles.icon} aria-hidden="true">🏠</span> */}
            <h3 className="title">Residential Window Cleaning</h3>
          </li>

          <li className={styles.serviceCard}>
            <h3 className="title">Commercial Window Cleaning</h3>
          </li>

          <li className={styles.serviceCard}>
            <h3 className="title">Hard Water Stain Removal</h3>
          </li>

          <li className={styles.serviceCard}>
            <h3 className="title">Screen &amp; Track Cleaning</h3>
          </li>
        </ul>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonials} aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading">Testimonials</h2>
        <p className={styles.quote}>
          “The best window cleaning service I’ve ever used! My windows look amazing.”
          <br />
          <small>— David R.</small>
        </p>
      </section>

      {/* If you want the CTA to scroll here instead of /contact, 
          add id="contact" to this section and change the CTA href to "#contact" */}
      {/* <section id="contact">...</section> */}
    </>
  );
}
