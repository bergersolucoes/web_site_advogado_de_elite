import { MessageCircle, ArrowUp } from "lucide-react";

export default function FloatingButtons() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Fale Conosco via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="ml-2 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-xs overflow-hidden">
          Fale Conosco
        </span>
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}