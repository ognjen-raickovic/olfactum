import { useTheme } from "@mui/material";
import { OrbitProgress } from "react-loading-indicators";

const LoadingSpinner = ({ size = "medium" }) => {
  const theme = useTheme();

  // console.log("LoadingSpinner rendering with theme:", theme.palette.mode);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <OrbitProgress
        color={theme.palette.primary.main}
        size={size}
        text=""
        textColor={theme.palette.text.primary}
      />
    </div>
  );
};

export default LoadingSpinner;
