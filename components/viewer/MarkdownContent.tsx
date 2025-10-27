import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./viewer.module.css";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className={styles.markdownContent}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
