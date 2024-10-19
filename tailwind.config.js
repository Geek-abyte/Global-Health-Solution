/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#d2dff2",
          2: "#b4c9e9",
          3: "#8faede",
          4: "#6993d2",
          5: "#4478c7",
          6: "#1e5dbc",
          7: "#194e9d",
          8: "#143e7d",
          9: "#0f2f5e",
          10: "#0a1f3f",
          11: "#061326",
        },
        secondary: {
          1: "#d9f4f0",
          2: "#bfede7",
          3: "#a0e4db",
          4: "#80dbce",
          5: "#60d2c2",
          6: "#40c9b6",
          7: "#35a898",
          8: "#2b8679",
          9: "#20655b",
          10: "#15433d",
          11: "#0d2824",
        },
        gray: {
          1: "#d0d0d0",
          2: "#b1b1b1",
          3: "#8a8a8b",
          4: "#636364",
          5: "#3c3c3d",
          6: "#151516",
          7: "#121212",
          8: "#0e0e0f",
          9: "#0b0b0b",
          10: "#070707",
          11: "#040404",
        },
      },
      animation: {
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      width: {
        max: "1200px",
      },
    },
  },
  plugins: [],
};
