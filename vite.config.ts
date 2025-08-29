import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        mentoria: path.resolve(__dirname, 'mentoria.html'),
        oab: path.resolve(__dirname, 'oab.html'),
        contato: path.resolve(__dirname, 'contato.html'),
        'politica-privacidade': path.resolve(__dirname, 'politica-privacidade.html'),
        'termos-servico': path.resolve(__dirname, 'termos-servico.html'),
      }
    }
  }
}));
