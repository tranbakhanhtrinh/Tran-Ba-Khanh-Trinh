import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'light-white-100': '#F1F4F5',
        'dark-blue': '#3D477A',
        'list-hover': 'rgb(240, 240, 240)',
        backdrop: 'rgba(0,0,0,0.5)',
        'exchange-input': '#2b3139'
      }
    }
  },
  plugins: []
}
export default config
