/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      "sans": "rig-sans"
    },
    colors: {
      "black": "#101010",
      "gray": "#171717",
      "light-gray": "#2b2b2b",
      "lighter-gray": "#767676",
      "white": "#ffffff",
      "green": "#22b07d",
      "transparent": "transparent"
    }
  },
  plugins: [
  ],
}

