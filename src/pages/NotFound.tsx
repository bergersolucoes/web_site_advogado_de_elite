import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-accent">404</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Página não encontrada</h1>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a 
          href="/" 
          className="btn-gold inline-flex items-center"
        >
          <Home className="w-4 h-4 mr-2" />
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
