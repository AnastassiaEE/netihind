import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {   
    extend: {
      animation: {
        show: 'show .25s cubic-bezier(0.4, 0, 0.2, 1)',
      }, 
      keyframes: {
        show: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    } 
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
