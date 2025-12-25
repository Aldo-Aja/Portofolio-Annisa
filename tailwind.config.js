/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#F4ECE6",
        "beige-light": "#FAF7F4",
        dark: "#222222",
        gray: "#666666",
        accent: "#E6B9C0",
      },
      fontFamily: {
        heading: ['"Heading Now"', "system-ui", "sans-serif"],
        script: ["Brittany", "cursive"],
        serif: ['"DM Serif Display"', "serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
