import { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { DeleteForever, Save, Logout } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const theme = useTheme();
  const { user, logout, updateUsername, changePassword, deleteAccount } =
    useAuth();
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Dialog states
  const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUpdateUsername = async () => {
    setError("");
    setMessage("");
    try {
      await updateUsername(newUsername);
      setMessage("Username updated successfully.");
      setNewUsername("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update username.");
    }
    setUsernameDialogOpen(false);
  };

  const handleChangePassword = async () => {
    setError("");
    setMessage("");
    try {
      await changePassword(currentPassword, newPassword);
      setMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
    }
    setPasswordDialogOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account.");
      setDeleteDialogOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ mb: 4, fontWeight: 700 }}>
        My Profile
      </Typography>

      {/* User Info Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Member since {memberSince}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{ textTransform: "none" }}
        >
          Log out
        </Button>
      </Paper>

      {/* Messages */}
      {message && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Change Username */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Change Username
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            setUsernameDialogOpen(true);
          }}
        >
          <TextField
            fullWidth
            label="New username"
            variant="outlined"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            inputProps={{ minLength: 3 }}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            disabled={!newUsername.trim()}
            sx={{ textTransform: "none" }}
          >
            Update Username
          </Button>
        </Box>
      </Paper>

      {/* Change Password */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            setPasswordDialogOpen(true);
          }}
        >
          <TextField
            fullWidth
            type="password"
            label="Current password"
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            type="password"
            label="New password (min 6 characters)"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            inputProps={{ minLength: 6 }}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            disabled={!currentPassword || !newPassword}
            sx={{ textTransform: "none" }}
          >
            Change Password
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Danger Zone */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor:
            theme.palette.mode === "dark" ? "rgba(255,0,0,0.08)" : "#FFF5F5",
          border: `1px solid ${theme.palette.error.main}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 600, color: "error.main" }}
        >
          Danger Zone
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Once you delete your account, all your data (reviews, wishlist,
          progress) will be permanently removed.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteForever />}
          onClick={() => setDeleteDialogOpen(true)}
          sx={{ textTransform: "none" }}
        >
          Delete My Account
        </Button>
      </Paper>

      {/* Confirmation Dialogs */}
      {/* Username change */}
      <Dialog
        open={usernameDialogOpen}
        onClose={() => setUsernameDialogOpen(false)}
      >
        <DialogTitle>Change Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change your username to{" "}
            <strong>{newUsername}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUsernameDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateUsername} variant="contained">
            Yes, change
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password change */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change your password?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Yes, change
          </Button>
        </DialogActions>
      </Dialog>

      {/* Account deletion */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All your reviews, wishlist, and
            progress will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
          >
            Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
