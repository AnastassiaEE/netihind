import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

export const breakpoints = {
  sm: '(max-width: 540px)',
  md: '(max-width: 720px)',
  lg: '(max-width: 960px)',
  xl: '(max-width: 1140px)',
  '2xl': '(max-width: 1320px)',
};

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
          '100%': { transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: colors.indigo['500'],
        'primary-dark': colors.indigo['600'],
        'primary-light': colors.indigo['50'],
        secondary: colors.violet['500'],
        accent: colors.fuchsia['500'],

        muted: colors.gray['400'], // small text, icons, placeholders, bullets
        'muted-dark': colors.slate['600'], // base text, inputs, links
        'muted-light': colors.gray['300'], // items borders

        valid: colors.gray['300'],
        invalid: colors.red['500'],

        error: colors.red['800'],
        success: colors.green['500'],
        'success-dark': colors.green['600'],

        'facebook-logo': '#0866FF',
        'instagram-logo-shadow': '#dc2743',
        'twitter-logo': '#333333',
        'youtube-logo': 'rgb(255, 0, 0)',
        'linkedin-logo': '#0077B5',
      },

      backgroundImage: {
        'instagram-logo':
          'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
      },
      gridTemplateColumns: {
        'packages-4': 'repeat(4, minmax(max-content, 100%))',
        'packages-5': 'repeat(5, minmax(max-content, 100%))',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }: { addComponents: any }) {
      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '95%',
          '@screen sm': {
            maxWidth: breakpoints.sm,
          },
          '@screen md': {
            maxWidth: breakpoints.md,
          },
          '@screen lg': {
            maxWidth: breakpoints.lg,
          },
          '@screen xl': {
            maxWidth: breakpoints.xl,
          },
          '@screen 2xl': {
            maxWidth: breakpoints['2xl'],
          },
        },
      });
    },
    plugin(({ addBase, theme }) => {
      addBase({
        p: { color: theme('colors.muted-dark') },
      });
    }),
  ],
};
export default config;
