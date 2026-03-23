import type { ComponentProps } from "react";

type IconProps = ComponentProps<"span">;

const githubSvg = "/icons/brand/github.svg";
const linkedinSvg = "/icons/brand/linkedin.svg";

/**
 * Renders a monochrome brand icon from `public/icons/brand/*.svg` using CSS mask so
 * `bg-current` follows link text color (unlike `<img>`, which bakes in fills).
 */
function BrandIcon({
  maskSrc,
  className,
  style,
  ...props
}: IconProps & { maskSrc: string }) {
  return (
    <span
      {...props}
      aria-hidden
      className={["inline-block bg-current", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        maskImage: `url(${maskSrc})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${maskSrc})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        ...style,
      }}
    />
  );
}

export function GitHubIcon(props: IconProps) {
  return <BrandIcon maskSrc={githubSvg} {...props} />;
}

export function LinkedInIcon(props: IconProps) {
  return <BrandIcon maskSrc={linkedinSvg} {...props} />;
}
