import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  TextField,
  Button,
  DialogActions
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

function DestinationForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", country: "", image: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (form.image && !/^https?:\/\/.+/.test(form.image)) newErrors.image = "Invalid URL";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onAdd(form);
      setForm({ name: "", country: "", image: "" });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        label="Name *"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={handleChange("name")}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
      <TextField
        label="Country *"
        fullWidth
        margin="normal"
        value={form.country}
        onChange={handleChange("country")}
        error={!!errors.country}
        helperText={errors.country}
        required
      />
      <TextField
        label="Image URL"
        fullWidth
        margin="normal"
        value={form.image}
        onChange={handleChange("image")}
        error={!!errors.image}
        helperText={errors.image || "Optional"}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Add Destination
      </Button>
    </form>
  );
}

function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(Array.isArray(data) ? data : []))
      .catch((err) => {
        setSnackbar({ open: true, message: err.message, severity: 'error' });
        setDestinations([]);
      });
  }, []);

  const addDestination = async (destinationData) => {
    try {
      const res = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destinationData)
      });
      if (!res.ok) throw new Error("Failed to add destination");
      const newDestination = await res.json();
      setDestinations((prev) => [...prev, newDestination]);
      setShowForm(false);
      setSnackbar({ open: true, message: "Destination added!", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleDeleteClick = (destination) => {
    setDestinationToDelete(destination);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!destinationToDelete) return;
    try {
      const res = await fetch(`http://localhost:5000/api/destinations/${destinationToDelete._id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete destination");
      setDestinations((prev) => prev.filter((d) => d._id !== destinationToDelete._id));
      setSnackbar({ open: true, message: "Destination deleted", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    } finally {
      setDeleteDialogOpen(false);
      setDestinationToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDestinationToDelete(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "linear-gradient(135deg, #f1f8e9 0%, #ffffff 100%)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          fontWeight: 900,
          color: "#2e7d32",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Destinations
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {destinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination._id}>
            <Card
              sx={{
                height: 320,
                borderRadius: 3,
                backgroundColor: "#fff",
                boxShadow: "0 10px 25px rgba(76, 175, 80, 0.15)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                  transform: "translateY(-6px)",
                }
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteClick(destination)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#c62828",
                  backgroundColor: "rgba(255,255,255,0.85)",
                  "&:hover": {
                    backgroundColor: "rgba(198, 40, 40, 0.2)",
                  }
                }}
                size="small"
              >
                <DeleteIcon />
              </IconButton>

              {destination.image ? (
                <CardMedia
                  component="img"
                  image={destination.image}
                  alt="Destination"
                  sx={{
                    width: 96,
                    height: 96,
                    borderRadius: "12px",
                    objectFit: "cover",
                    border: "3px solid #a5d6a7",
                    mb: 2
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 12,
                    backgroundColor: "#a5d6a7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                    color: "#2e7d32",
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  {destination.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}

              <CardContent
                sx={{
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#2e7d32" }}>
                  {destination.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  🌍 {destination.country}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setShowForm(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#2e7d32",
          "&:hover": { backgroundColor: "#1b5e20" },
          boxShadow: "0 5px 15px rgba(76, 175, 80, 0.4)"
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          Add Destination
          <IconButton
            aria-label="close"
            onClick={() => setShowForm(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DestinationForm onAdd={addDestination} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{destinationToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DestinationList;
