import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';

function TravelerForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    phone: "",
    email: "",
    country: "",
    sex: "",
  });

  const [errors, setErrors] = useState({});

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "Other",
  ];

  const sexes = ["Male", "Female", "Other"];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.avatar && !/^https?:\/\/.+/.test(formData.avatar)) newErrors.avatar = "Invalid URL";
    if (formData.phone && !/^\+?[\d\s\-().]{7,}$/.test(formData.phone)) newErrors.phone = "Invalid phone";
    return newErrors;
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onAdd(formData);
      setFormData({
        name: "",
        avatar: "",
        phone: "",
        email: "",
        country: "",
        sex: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        label="Name *"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange("name")}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
      <TextField
        label="Avatar URL"
        fullWidth
        margin="normal"
        value={formData.avatar}
        onChange={handleChange("avatar")}
        error={!!errors.avatar}
        helperText={errors.avatar || "Optional"}
      />
      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        value={formData.phone}
        onChange={handleChange("phone")}
        error={!!errors.phone}
        helperText={errors.phone || "Optional"}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange("email")}
        error={!!errors.email}
        helperText={errors.email || "Optional"}
      />
      <TextField
        label="Country"
        select
        fullWidth
        margin="normal"
        value={formData.country}
        onChange={handleChange("country")}
        helperText="Optional"
      >
        {countries.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Sex"
        select
        fullWidth
        margin="normal"
        value={formData.sex}
        onChange={handleChange("sex")}
        helperText="Optional"
      >
        {sexes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add Traveler
      </Button>
    </form>
  );
}

function TravelerList() {
  const [travelers, setTravelers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [travelerToDelete, setTravelerToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/travelers")
      .then(res => res.json())
      .then(data => setTravelers(Array.isArray(data) ? data : []))
      .catch(err => {
        setSnackbar({ open: true, message: err.message, severity: 'error' });
        setTravelers([]);
      });
  }, []);

  const addTraveler = async (travelerData) => {
    try {
      const res = await fetch("http://localhost:5000/api/travelers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travelerData)
      });
      if (!res.ok) throw new Error("Failed to add traveler");
      const newTraveler = await res.json();
      setTravelers((prev) => [...prev, newTraveler]);
      setShowForm(false);
      setSnackbar({ open: true, message: 'Traveler added!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  // Delete handlers...

  const handleDeleteClick = (traveler) => {
    setTravelerToDelete(traveler);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!travelerToDelete) return;
    try {
      const res = await fetch(`http://localhost:5000/api/travelers/${travelerToDelete._id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete traveler");
      }
      setTravelers(prev => prev.filter(t => t._id !== travelerToDelete._id));
      setSnackbar({ open: true, message: 'Traveler and related travels deleted successfully.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setTravelerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setTravelerToDelete(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          fontWeight: 900,
          color: '#0D47A1',
          letterSpacing: 2,
          textTransform: 'uppercase',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        Travelers
      </Typography>

      <Grid container spacing={5} justifyContent="center">
        {Array.isArray(travelers) && travelers.map(traveler => (
          <Grid item xs={12} sm={6} md={4} key={traveler._id}>
            <Card
              sx={{
                height: 340,
                borderRadius: 3,
                boxShadow: '0 10px 25px rgba(13, 71, 161, 0.15)',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 15px 35px rgba(64, 64, 65, 0.3)',
                  transform: 'translateY(-8px)',
                }
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteClick(traveler)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: '#e53935',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  '&:hover': {
                    backgroundColor: 'rgba(229, 57, 53, 0.2)',
                  }
                }}
                size="small"
              >
                <DeleteIcon />
              </IconButton>

              {traveler.avatar ? (
                <CardMedia
                  component="img"
                  image={traveler.avatar}
                  alt="avatar"
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #bbdefb',
                    boxShadow: '0 3px 10px rgba(13, 71, 161, 0.15)',
                    mb: 2,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    backgroundColor: '#bbdefb',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0D47A1',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    marginBottom: 16,
                    userSelect: 'none',
                  }}
                >
                  {traveler.name ? traveler.name.charAt(0).toUpperCase() : '?'}
                </div>
              )}

              <CardContent
                sx={{
                  p: 0,
                  textAlign: 'center',
                  width: '100%',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  title={traveler.name}
                  sx={{
                    fontWeight: 700,
                    color: '#0D47A1',
                    fontSize: '1.1rem',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {traveler.name.length > 25 ? traveler.name.slice(0, 22) + '...' : traveler.name}
                </Typography>

                <Typography
                  variant="body2"
                  noWrap
                  title={traveler.phone}
                  sx={{
                    color: '#555',
                    fontSize: '0.85rem',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mt: 0.5,
                  }}
                >
                  📞 {traveler.phone || '-'}
                </Typography>

                <Typography
                  variant="body2"
                  noWrap
                  title={traveler.email}
                  sx={{
                    color: '#555',
                    fontSize: '0.85rem',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mt: 0.5,
                  }}
                >
                  📧 {traveler.email || '-'}
                </Typography>

                <div
                  style={{
                    marginTop: 12,
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <Chip
                    label={traveler.country || 'Unknown'}
                    sx={{
                      backgroundColor: '#bbdefb',
                      color: '#0D47A1',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      maxWidth: 110,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    size="small"
                  />
                  <Chip
                    label={traveler.sex || 'Unknown'}
                    sx={{
                      backgroundColor: '#bbdefb',
                      color: '#0D47A1',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      maxWidth: 80,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    size="small"
                  />
                </div>
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
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: '#0D47A1',
          '&:hover': { backgroundColor: '#08306b' },
          boxShadow: '0 5px 15px rgba(13, 71, 161, 0.4)',
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add New Traveler
          <IconButton
            aria-label="close"
            onClick={() => setShowForm(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#0D47A1',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TravelerForm onAdd={addTraveler} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{travelerToDelete?.name}</strong> and all their travels?
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

export default TravelerList;
