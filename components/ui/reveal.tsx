"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, type ElementType } from "react";

interface RevealProps {
  children: React.ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  once?: boolean;
  variant?: "fade-up" | "fade-in" | "scale";
}

export const Reveal = React.forwardRef<HTMLElement, RevealProps>(
  function Reveal(
    {
      children,
      as: Tag = "div",
      delay = 0,
      className,
      once = true,
      variant = "fade-up",
    },
    forwardedRef
  ) {
    const localRef = useRef<HTMLElement | null>(null);
    const ref = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    };
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              if (once) observer.disconnect();
            } else if (!once) {
              setVisible(false);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [once]);

    return (
      <Tag
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={cn(
          "reveal base-transition",
          variant === "fade-up" && "reveal-fade-up",
          variant === "fade-in" && "reveal-fade-in",
          variant === "scale" && "reveal-scale",
          visible && "reveal-visible",
          className
        )}
      >
        {children}
      </Tag>
    );
  }
);
