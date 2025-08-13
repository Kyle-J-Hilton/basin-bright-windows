"use client";
import { useMemo, useState } from "react";
import styles from "./testimonials.module.css";

const INITIAL = [
  { name:"David R.", rating:5, text:"The best window cleaning service I’ve ever used! My windows look amazing.", type:"Residential" },
  { name:"Sarah M.", rating:5, text:"On-time, efficient, and super friendly. Highly recommend.", type:"Commercial" },
];

const TYPES = ["All","Residential","Commercial"];

export default function TestimonialsPage(){
  const [name,setName]=useState(""); const [rating,setRating]=useState(5);
  const [text,setText]=useState(""); const [type,setType]=useState("Residential");
  const [open,setOpen]=useState({}); // read-more map
  const [filter,setFilter]=useState("All");
  const [reviews,setReviews]=useState(INITIAL);

  const list = useMemo(
    () => reviews.filter(r => filter==="All" ? true : r.type===filter),
    [reviews, filter]
  );

  const onPost=(e)=>{
    e.preventDefault();
    if(!name || !text) return;
    setReviews([{name, rating:Number(rating), text, type}, ...reviews]);
    setName(""); setRating(5); setText(""); setType("Residential");
  };

  const stars = (n)=> "★".repeat(n) + "☆".repeat(5-n);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.headerBlock}>
          <h1>Testimonials</h1>
          <p>Read what neighbors say—and leave your own review.</p>
        </section>

        <div className={styles.content}>
          <form onSubmit={onPost} className={styles.form}>
            <h3 className={styles.contentTitle}>Leave a review</h3>
            <label className={styles.field}><span>Name</span>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
            </label>
            <label className={styles.field}><span>Rating</span>
              <select value={rating} onChange={e=>setRating(e.target.value)}>
                {[5,4,3,2,1].map(n=><option key={n} value={n}>{n} ★</option>)}
              </select>
            </label>
            <label className={styles.field}><span>Type</span>
              <select value={type} onChange={e=>setType(e.target.value)}>
                <option>Residential</option><option>Commercial</option>
              </select>
            </label>
            <label className={styles.field}><span>Your Review</span>
              <textarea rows={4} value={text} onChange={e=>setText(e.target.value)} placeholder="What did you like?" />
            </label>
            <button className={styles.submitBtn}>Post Review</button>
          </form>

          <div className={styles.reviews}>
            <div className={styles.filters}>
              {TYPES.map(t=>(
                <button key={t} className={styles.pill} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t}</button>
              ))}
            </div>

            {list.map((r,i)=>(
              <article key={i} className={styles.reviewCard}>
                <div className={styles.reviewHead}>
                  <div className={styles.avatar}>{(r.name||"?").slice(0,1).toUpperCase()}</div>
                  <strong>{r.name}</strong>
                  <span className={styles.starRow}>{stars(r.rating)}</span>
                </div>
                <p className={open[i] ? "" : styles.bodyClamp}>{r.text}</p>
                {r.text.length > 120 && (
                  <span className={styles.readMore} onClick={()=>setOpen(o=>({...o, [i]: !o[i]}))}>
                    {open[i] ? "Show less" : "Read more"}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
