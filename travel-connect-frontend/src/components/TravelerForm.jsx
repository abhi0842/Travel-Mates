import { useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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

export default TravelerForm;
