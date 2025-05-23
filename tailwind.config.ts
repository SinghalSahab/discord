import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      md: "768px", // Default Tailwind md breakpoint
    },
    extend: {},
  },
  plugins: [],
}

export default config
