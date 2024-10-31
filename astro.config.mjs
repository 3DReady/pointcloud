import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from "astro-icon"
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [mdx(), icon(),react(), tailwind({
    applyBaseStyles: false,
  }), 
  // compress()
  ],
  vite: {
    css: {
      minify: false, // Disable CSS minification
    },
  },
})
