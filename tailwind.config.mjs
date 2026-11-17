/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          50: "#eef6fc",
          100: "#d6eaf8",
          200: "#add4f0",
          300: "#7ab9e5",
          400: "#3a97d6",
          500: "#0c80cb",
          600: "#006fbd",
          700: "#005c9d",
          800: "#004b80",
          900: "#003c66",
        },
        dark: {
          700: "#0F8FD6",
          800: "#0F8FD6",
          900: "#1e377c",
        },
        ink: "#1d1d1f",
        "ink-secondary": "#6e6e73",
        surface: "#f5f5f7",
        line: "#e8e8ed",
      },
      borderRadius: {
        card: "16px",
        panel: "24px",
        pill: "980px",
      },
    },
  },
  plugins: [],
};

export default config;
