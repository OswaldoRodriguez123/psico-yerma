import Image from "next/image";
import { site } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo.png"
      alt={site.name}
      width={196}
      height={114}
      priority
      className={className}
    />
  );
}
