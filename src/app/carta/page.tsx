import type { Metadata } from "next";
import { Dancing_Script, Lora } from "next/font/google";
import { letter } from "@/content/letter";
import { HeartIcon } from "@/components/ui/icons";

const lora = Lora({ subsets: ["latin"], variable: "--font-letter" });
const script = Dancing_Script({ subsets: ["latin"], variable: "--font-script" });

// Página privada: no se enlaza en el menú, no se indexa y no está en el sitemap.
export const metadata: Metadata = {
  title: { absolute: "Para ti" },
  robots: { index: false, follow: false },
};

export default function LetterPage() {
  return (
    <main
      className={`${lora.variable} ${script.variable} flex flex-1 items-center justify-center px-4 py-16 sm:py-24`}
      style={{
        background:
          "linear-gradient(180deg, #fdece5 0%, #fdfbf7 45%, #efeaf8 100%)",
      }}
    >
      <article className="w-full max-w-2xl rounded-3xl border border-border bg-surface/90 p-8 shadow-sm backdrop-blur sm:p-12">
        <HeartIcon className="mx-auto h-7 w-7 text-primary" />

        <p className={`${script.className} mt-6 text-3xl text-ink`}>
          {letter.greeting}
        </p>

        <div
          className={`${lora.className} mt-6 space-y-4 text-lg leading-relaxed text-ink-soft`}
        >
          {letter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p
          className={`${script.className} mt-8 text-right text-2xl whitespace-pre-line text-ink`}
        >
          {letter.signature}
        </p>
      </article>
    </main>
  );
}
