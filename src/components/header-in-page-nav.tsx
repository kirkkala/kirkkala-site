"use client";

import { usePathname } from "next/navigation";

const items = [
  { id: "work", label: "Code" },
  { id: "basketball", label: "Hoops" },
  { id: "photos", label: "Film" },
  { id: "repos", label: "Repos" },
] as const;

export function HeaderInPageNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <>
      {items.map((item) => (
        <a
          key={item.id}
          href={onHome ? `#${item.id}` : `/#${item.id}`}
          className="nav-link nav-link-inpage"
        >
          {item.label}
        </a>
      ))}
    </>
  );
}
