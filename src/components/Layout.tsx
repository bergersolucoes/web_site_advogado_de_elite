import { useState, useEffect } from "react";
import { Menu, X, Scale, Users, GraduationCap, Mail } from "lucide-react";
import logo from "@/assets/logo-elite.png";
import FloatingButtons from "./FloatingButtons";

const navigation = [
  { name: "Petições", href: "/", icon: Scale },
  { name: "Mentoria", href: "/mentoria.html", icon: Users },
  { name: "Exame & Concursos", href: "/oab.html", icon: GraduationCap },
  { name: "Contato", href: "/contato.html", icon: Mail }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  // Force scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-3 py-2">
                <img className="h-16 w-auto" src={logo} alt="Advogado de Elite" />
              </a>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href || (item.href === "/" && currentPath === "/index.html");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-foreground hover:text-accent p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href || (item.href === "/" && currentPath === "/index.html");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img className="h-20 w-auto mb-4" src={logo} alt="Advogado de Elite" />
              <p className="text-muted-foreground mb-4 max-w-md">
                35 anos de atuação em diversas áreas do Direito. Exclusividade, sigilo e técnica — sem IA.
              </p>
              
              {/* Redes Sociais */}
              <div className="social flex space-x-4 mt-6">
                <a href="https://instagram.com/SEUUSER" aria-label="Instagram" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.013 6.71.072 5.493.131 4.68.333 3.982.63c-.72.297-1.326.696-1.932 1.302-.606.606-1.005 1.212-1.302 1.932-.297.698-.499 1.511-.558 2.728C.072 7.912.06 8.379.06 12.017c0 3.639.013 4.106.072 5.323.059 1.217.261 2.03.558 2.728.297.72.696 1.326 1.302 1.932.606.606 1.212 1.005 1.932 1.302.698.297 1.511.499 2.728.558 1.217.059 1.684.072 5.323.072 3.639 0 4.106-.013 5.323-.072 1.217-.059 2.03-.261 2.728-.558.72-.297 1.326-.696 1.932-1.302.606-.606 1.005-1.212 1.302-1.932.297-.698.499-1.511.558-2.728.059-1.217.072-1.684.072-5.323 0-3.639-.013-4.106-.072-5.323-.059-1.217-.261-2.03-.558-2.728-.297-.72-.696-1.326-1.302-1.932C19.329.696 18.723.297 18.003.63 17.305.333 16.492.131 15.275.072 14.058.013 13.591.001 12.017.001h0zm0 2.161c3.549 0 3.97.014 5.372.072 1.297.059 2.001.275 2.47.458.621.242 1.064.531 1.531.998.468.468.756.91.998 1.531.183.469.399 1.173.458 2.47.058 1.402.072 1.823.072 5.372 0 3.549-.014 3.97-.072 5.372-.059 1.297-.275 2.001-.458 2.47-.242.621-.531 1.064-.998 1.531-.468.468-.91.756-1.531.998-.469.183-1.173.399-2.47.458-1.402.058-1.823.072-5.372.072-3.549 0-3.97-.014-5.372-.072-1.297-.059-2.001-.275-2.47-.458-.621-.242-1.064-.531-1.531-.998-.468-.468-.756-.91-.998-1.531-.183-.469-.399-1.173-.458-2.47-.058-1.402-.072-1.823-.072-5.372 0-3.549.014-3.97.072-5.372.059-1.297.275-2.001.458-2.47.242-.621.531-1.064.998-1.531.468-.468.91-.756 1.531-.998.469-.183 1.173-.399 2.47-.458 1.402-.058 1.823-.072 5.372-.072z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.017 5.838c-3.403 0-6.158 2.755-6.158 6.158 0 3.403 2.755 6.158 6.158 6.158 3.403 0 6.158-2.755 6.158-6.158 0-3.403-2.755-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997-1.789 3.997-3.997 3.997z" clipRule="evenodd" />
                    <circle cx="18.406" cy="5.594" r="1.44" />
                  </svg>
                </a>
                <a href="https://youtube.com/@SEUCANAL" aria-label="YouTube" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/SEUPERFIL" aria-label="LinkedIn" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Comunicação informativa, sem promessa de resultado. Serviços destinados a advogados(as).
              </p>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/politica-privacidade.html"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="/termos-servico.html"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    Termos de Serviço
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 Advogado de Elite. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}