import { astroStore } from "@/lib/astro-store";
import React, { useEffect, useRef, useState } from "react";
import styles from "./viewer.module.css";
import Predication from "@/app/types/predication";
import MarkdownContent from "./MarkdownContent";

export default function Viewer(props: { predictions: Array<Predication> }) {
  const [blur, setBlur] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage =
      (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;

    if (scrollPercentage > 32) {
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
      {props.predictions?.map((prediction, index) => (
        <div key={prediction.responseId || index} className={styles.content}>
          <MarkdownContent content={prediction.text} />
        </div>
      ))}
    </div>
  );
}
