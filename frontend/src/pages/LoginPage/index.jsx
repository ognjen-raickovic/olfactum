import { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData);
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username or Email"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            inputProps={{ minLength: 8 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ textTransform: "none", py: 1.5, mb: 2 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Don't have an account?{" "}
          <MuiLink component={Link} to="/register" underline="hover">
            Create one
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
