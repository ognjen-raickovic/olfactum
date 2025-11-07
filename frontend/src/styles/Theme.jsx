import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F7F4",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2A2A2A",
      secondary: "#6B6B6B",
    },
    primary: {
      main: "#9C7C5C",
      light: "#B8A08A",
      dark: "#7D6145",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8B7355",
      light: "#A89277",
      dark: "#6D5A3E",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#FAF9F7",
      100: "#F5F3F0",
      200: "#E8E6E1",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.75rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.25rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1A1816",
      paper: "#26221E",
    },
    text: {
      primary: "#F0EDE9",
      secondary: "#C4BDB5",
    },
    primary: {
      main: "#C8A97E",
      light: "#DBC4A4",
      dark: "#A88B61",
      contrastText: "#1A1816",
    },
    secondary: {
      main: "#8B7355",
      light: "#A89277",
      dark: "#6D5A3E",
      contrastText: "#F0EDE9",
    },
    grey: {
      50: "#2A2622",
      100: "#36312B",
      200: "#453F38",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.75rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.25rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: "none",
        },
      },
    },
  },
});
