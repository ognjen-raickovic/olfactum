import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search, Delete, Upgrade, ArrowDownward } from "@mui/icons-material";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext"; // <-- import

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user: loggedInUser } = useAuth(); // <-- get current user
  const isSuperadmin = loggedInUser?.role_id === 3; // only superadmin can change roles

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (roleFilter) params.append("role_id", roleFilter);
      params.append("sort", "created_at");
      params.append("order", sortOrder);
      params.append("page", page + 1);
      params.append("limit", rowsPerPage);

      const res = await api.get(`/admin/users?${params.toString()}`);
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to load users", err);
      setNotification({
        open: true,
        message: "Failed to load users",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, roleFilter, sortOrder, page, rowsPerPage]);

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role_id: newRoleId });
      setNotification({
        open: true,
        message: "Role updated successfully",
        severity: "success",
      });
      fetchUsers();
    } catch (err) {
      setNotification({
        open: true,
        message: "Failed to update role",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/admin/users/${userToDelete.user_id}`);
      setNotification({
        open: true,
        message: "User deleted successfully",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      setNotification({
        open: true,
        message: "Failed to delete user",
        severity: "error",
      });
    }
  };

  const getRoleChip = (roleName) => {
    const color =
      roleName === "superadmin"
        ? "error"
        : roleName === "admin"
          ? "primary"
          : "default";
    return (
      <Chip label={roleName} size="small" color={color} variant="outlined" />
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          size="small"
          placeholder="Search by ID, username or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250, flex: isMobile ? 1 : undefined }}
        />
        <TextField
          select
          size="small"
          label="Role"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(0);
          }}
          SelectProps={{
            MenuProps: { disableScrollLock: true },
          }}
          sx={{ minWidth: 150, flex: isMobile ? 1 : undefined }}
        >
          <MenuItem value="">All roles</MenuItem>
          <MenuItem value="1">User</MenuItem>
          <MenuItem value="2">Admin</MenuItem>
          <MenuItem value="3">Superadmin</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          label="Sort by"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(0);
          }}
          SelectProps={{
            MenuProps: { disableScrollLock: true },
          }}
          sx={{ minWidth: 150, flex: isMobile ? 1 : undefined }}
        >
          <MenuItem value="desc">Newest first</MenuItem>
          <MenuItem value="asc">Oldest first</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ overflowX: "auto" }}
          >
            <Table size="small" sx={{ minWidth: isMobile ? 700 : undefined }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="center" sx={{ minWidth: 280 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleChip(user.role_name)}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {/* Role management – only visible to superadmin */}
                        {isSuperadmin && (
                          <Box
                            sx={{
                              width: 160,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {user.role_id === 1 && (
                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                startIcon={<Upgrade />}
                                onClick={() =>
                                  handleRoleChange(user.user_id, 2)
                                }
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                Promote to Admin
                              </Button>
                            )}
                            {user.role_id === 2 && (
                              <Button
                                size="small"
                                variant="outlined"
                                color="warning"
                                startIcon={<ArrowDownward />}
                                onClick={() =>
                                  handleRoleChange(user.user_id, 1)
                                }
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                Demote to User
                              </Button>
                            )}
                          </Box>
                        )}

                        {/* Delete button – hidden for superadmin rows */}
                        {user.role_name !== "superadmin" && (
                          <Box
                            sx={{
                              width: 40,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteClick(user)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 20, 50]}
            sx={{
              ".MuiTablePagination-toolbar": {
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                {
                  margin: 0,
                },
            }}
          />
        </>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user{" "}
            <strong>{userToDelete?.username}</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;
