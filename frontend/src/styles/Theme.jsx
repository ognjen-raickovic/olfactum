import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FDFDFD",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C2C2C",
      secondary: "#5D5D5D",
    },
    primary: {
      main: "#8B7355",
      light: "#A88C6D",
      dark: "#6D5A3E",
    },
    secondary: {
      main: "#2C2C2C",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1A1A1A",
      paper: "#2D2D2D",
    },
    text: {
      primary: "#E8E8E8",
      secondary: "#B0B0B0",
    },
    primary: {
      main: "#C19A6B",
      light: "#D4B592",
      dark: "#A87C49",
    },
    secondary: {
      main: "#E8E8E8",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
