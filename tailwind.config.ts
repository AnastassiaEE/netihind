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

        error: colors.red['800'],
        success: colors.green['500'],
        'success-dark': colors.green['600'],

        'facebook-logo': '#0866FF',
        'instagram-logo-shadow': '#dc2743',
        'twitter-logo': '#333333',
        'youtube-logo': 'rgb(255, 0, 0)',
        'linkedin-logo': '#0077B5'
      },

      backgroundImage: {
        'instagram-logo': 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
      }
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents } : {addComponents: any}) {
      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '95%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
          '@screen 2xl': {
            maxWidth: '1320px',
          },
        }
      })
    }
  ],
}
export default config
