
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages alt klasörlerde (username.github.io/repo-name) çalıştığı için 
  // base path'i './' yaparak tüm varlıkların göreceli yollarla yüklenmesini sağlıyoruz.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
