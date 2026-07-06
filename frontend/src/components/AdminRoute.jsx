import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  if (!user || (user.role_id !== 2 && user.role_id !== 3)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;
