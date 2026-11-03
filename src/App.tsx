import { useCallback, useState } from "react";
import { Floating } from "./components/Floating";
import { Header } from "./components/Header";
import { QuoteModal } from "./components/QuoteModal";
import { Faq, Incoterms, Industries } from "./components/Resources";
import { About, Contact, Footer, Hero, Process, Reach, Services, Stats, Testimonials } from "./components/Sections";
import { Tools } from "./components/Tools";
import { useTheme } from "./hooks";
import { useI18n } from "./i18n";
import type { OpenQuote, QuoteSeed } from "./types";

export default function App() {
  const { t } = useI18n();
  const [theme, toggleTheme] = useTheme();
  const [quote, setQuote] = useState<{ open: boolean; seed: QuoteSeed | null }>({ open: false, seed: null });
  const openQuote: OpenQuote = useCallback((seed) => setQuote({ open: true, seed: seed ?? null }), []);
  const closeQuote = useCallback(() => setQuote((q) => ({ ...q, open: false })), []);

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <Header onQuote={openQuote} theme={theme} onTheme={toggleTheme} />
      <main id="main">
        <Hero onQuote={openQuote} />
        <Stats />
        <Services onQuote={openQuote} />
        <Tools onQuote={openQuote} />
        <About />
        <Process />
        <Industries />
        <Reach />
        <Incoterms />
        <Testimonials />
        <Faq />
        <Contact onQuote={openQuote} />
      </main>
      <Footer />
      <Floating />
      <QuoteModal open={quote.open} seed={quote.seed} onClose={closeQuote} />
    </>
  );
}
