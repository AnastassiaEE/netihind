import type { Config } from 'tailwindcss'
import { ReactNode } from "react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {    
  },
  extend: { 
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents } : {addComponents: any}) {
      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '95%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
          '@screen 2xl': {
            maxWidth: '1536px',
          },
        }
      })
    }
  ],
}
export default config
