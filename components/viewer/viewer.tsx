import { astroStore } from "@/lib/astro-store";
import React, { useEffect, useRef, useState } from "react";
import styles from "./viewer.module.css";

export default function Viewer() {
  const predictions = astroStore((state) => state.predictions);
  const [blur, setBlur] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage =
      (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;

    if (scrollPercentage > 35) {
      setBlur(true);
    } else {
      setBlur(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.viewer} ${blur ? styles.blur : ""}`}
      onScroll={handleScroll}
    >
      {predictions?.map((prediction, index) => (
        <p key={prediction.responseId || index} className={styles.content}>
          {prediction.text}
        </p>
      ))}
    </div>
  );
}
