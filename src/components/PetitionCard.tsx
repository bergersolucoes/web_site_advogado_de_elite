interface PetitionCardProps {
  title: string;
  area: string;
  description: string;
  onRequestQuote: () => void;
}

export default function PetitionCard({ title, area, description, onRequestQuote }: PetitionCardProps) {
  return (
    <div className="card-premium hover-lift group cursor-pointer">
      <div className="mb-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-3">
          {area}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <button
        onClick={onRequestQuote}
        className="btn-outline-gold w-full"
      >
        Solicitar Orçamento
      </button>
    </div>
  );
}