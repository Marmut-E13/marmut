import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        'marmut-000': '#f5f5f5',
        'marmut-100': '#dddddd',
        'marmut-200': '#c4c4c4',
        'marmut-300': '#acacac',
        'marmut-400': '#939393',
        'marmut-500': '#7b7b7b',
        'marmut-600': '#626262',
        'marmut-700': '#494949',
        'marmut-800': '#313131',
        'marmut-900': '#181818',

        'danger-100': '#E60000',

        'marmut-green-100': '#707b4c',
        'marmut-green-200': '#606c38',
        'marmut-green-300': '#606c38',
        'marmut-green-400': '#566132',
        'marmut-green-500': '#4d562d',
        'marmut-green-600': '#434c27',
        'marmut-green-700': '#3a4122',
        'marmut-green-800': '#30361c',
        'marmut-green-900': '#262b16',

        'marmut-dark-green-100': '#3e4a2f',
        'marmut-dark-green-200': '#283618',
        'marmut-dark-green-300': '#283618',
        'marmut-dark-green-400': '#243116',
        'marmut-dark-green-500': '#202b13',
        'marmut-dark-green-600': '#1c2611',
        'marmut-dark-green-700': '#18200e',
        'marmut-dark-green-800': '#141b0c',
        'marmut-dark-green-900': '#10160a',
        
        'marmut-cream-300': '#fefae0',

        'marmut-light-brown-100': '#e0aa6e',
        'marmut-light-brown-200': '#dda15e',
        'marmut-light-brown-300': '#dda15e',
        'marmut-light-brown-400': '#c79155',
        'marmut-light-brown-500': '#b1814b',
        'marmut-light-brown-600': '#9b7142',
        'marmut-light-brown-700': '#856138',
        'marmut-light-brown-800': '#6f512f',
        'marmut-light-brown-900': '#584026',

        'marmut-brown-100': '#c37b3b',
        'marmut-brown-200': '#bc6c25',
        'marmut-brown-300': '#bc6c25',
        'marmut-brown-400': '#a96121',
        'marmut-brown-500': '#96561e',
        'marmut-brown-600': '#844c1a',
        'marmut-brown-700': '#714116',
        'marmut-brown-800': '#5e3613',
        'marmut-brown-900': '#4b2b0f'
      },
    },
  },
  plugins: [],
};
export default config;
