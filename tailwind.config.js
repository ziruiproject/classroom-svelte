/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      "sans": "rig-sans"
    },
    colors: {
      "black": "#1f1d2b",
      "gray": "#252836",
      "light-gray": "#2f3142",
      "lighter-gray": "#1a1924",
      "text-gray": "#64656c",
      "white": "#ffffff",
      "green": "#22b07d",
      "transparent": "transparent",
      "purple": "#b548c6"
    }
  },
  plugins: [
  ],
}

