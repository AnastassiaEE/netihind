import type { Config } from 'tailwindcss'
import colors, { indigo } from "tailwindcss/colors"

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
      },
      colors: {
        primary: colors.indigo['500'],
        'primary-dark': colors.indigo['600'],
        secondary: colors.violet['500'],
        accent: colors.fuchsia['500'],
        
        neutral: colors.indigo['100'],
        'neutral-dark': colors.gray['900'],
        'neutral-light': colors.indigo['50'],

        muted: colors.gray['400'], // small text, icons, placeholders, bullets
        'muted-dark': colors.slate['600'], // base text, inputs, links
        'muted-light': colors.slate['200'],// items borders
       
        valid: colors.gray['300'],
        invalid: colors.red['500'],

        error: colors.red['800']
        
      } 
    },
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
