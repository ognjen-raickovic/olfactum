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
      default: "#1C140E", // deep roasted brown (coffee bean base)
      paper: "#2A1E14", // lighter brown for cards
    },
    text: {
      primary: "#EDE0D4", // warm cream for readability
      secondary: "#C7B6A1", // muted beige accent
    },
    primary: {
      main: "#C19A6B", // caramel/golden brown
      light: "#D4B592",
      dark: "#8B6A45",
    },
    secondary: {
      main: "#EDE0D4", // matches text.primary tone
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
});
