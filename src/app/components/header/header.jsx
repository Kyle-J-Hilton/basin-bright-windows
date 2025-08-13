'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';

export const metadata = { title: "Contact | Basin Bright Windows" };

export default function ContactPage() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logoContainer} aria-label="Basin Bright Windows Home">
          <Image
            src="/logo.png"
            alt="Basin Bright Logo"
            className={styles.logoImg}
            width={44}
            height={44}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.brandTop}>BASIN BRIGHT</span>
            <span className={styles.brandSub}>WINDOWS</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/testimonials" className={styles.link}>Testimonials</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {/* simple hamburger */}
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          <Link href="/services" className={styles.mobileLink} onClick={() => setOpen(false)}>Services</Link>
          <Link href="/#testimonials" className={styles.mobileLink} onClick={() => setOpen(false)}>Testimonials</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
