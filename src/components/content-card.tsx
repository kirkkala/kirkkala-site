import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ContentCardLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "className" | "children"
> & {
  children: ReactNode;
  className?: string;
};

/** Full-card link (e.g. GitHub repo): border hover, description line-clamped. */
export function ContentCardLink({
  children,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: ContentCardLinkProps) {
  return (
    <a
      className={["content-card", "content-card-link", "group", className]
        .filter(Boolean)
        .join(" ")}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}

type ContentCardBlockProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
};

/** Static card (e.g. club product): same shell, hover on container. */
export function ContentCardBlock({
  children,
  className = "",
  as: Tag = "article",
}: ContentCardBlockProps) {
  return (
    <Tag
      className={["content-card", "content-card-block", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

export function ContentCardRow({ children }: { children: ReactNode }) {
  return <div className="content-card-row">{children}</div>;
}

export function ContentCardTitle({ children }: { children: ReactNode }) {
  return <h3 className="content-card-title">{children}</h3>;
}

export function ContentCardEyebrow({ children }: { children: ReactNode }) {
  return <p className="content-card-eyebrow">{children}</p>;
}

type ContentCardDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function ContentCardDescription({
  children,
  className = "",
}: ContentCardDescriptionProps) {
  return (
    <p className={["content-card-desc", className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}

export function ContentCardDescriptionEmpty({
  children,
}: {
  children: ReactNode;
}) {
  return <p className="content-card-desc-empty">{children}</p>;
}

export function ContentCardFork({ children }: { children: ReactNode }) {
  return <span className="content-card-fork">{children}</span>;
}

export function ContentCardStars({ count }: { count: number }) {
  return (
    <span className="content-card-stars">
      <span className="sr-only">{count} stars</span>
      <span aria-hidden="true">★ {count}</span>
    </span>
  );
}

export function ContentCardLang({ children }: { children: ReactNode }) {
  return <p className="content-card-lang">{children}</p>;
}
