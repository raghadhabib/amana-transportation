import type { Config } from 'tailwindcss';

const config: Config = {
  // 🚨 CRITICAL FIX: This line tells Tailwind to look for a 
  // '.dark' class on a parent element, overriding the system preference.
  darkMode: 'class', 
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // You can add any custom theme settings here if needed
    },
  },
  plugins: [],
};

export default config;
