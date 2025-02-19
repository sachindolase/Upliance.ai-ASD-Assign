import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, Paper, Snackbar, Alert, InputAdornment, } from '@mui/material';
import { Email, Person, Phone, Home } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

function UserForm() {
  const dispatch = useDispatch();

  const initialFormState = { id: '', name: '', email: '', address: '', phone: '', };

  const [formData, setFormData] = useState(initialFormState);
  const [initialData, setInitialData] = useState(initialFormState);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHasUnsavedChanges(JSON.stringify(formData) !== JSON.stringify(initialData));
  }, [formData, initialData]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      ...formData,
      id: formData.id || `USER_${Date.now()}`,
    };

    dispatch(addUser(userData));
    setInitialData(userData);
    setHasUnsavedChanges(false);
    setShowSuccessAlert(true);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { name: 'name', label: 'Name', icon: <Person /> },
              { name: 'email', label: 'Email', type: 'email', icon: <Email /> },
              { name: 'address', label: 'Address', icon: <Home /> },
              { name: 'phone', label: 'Phone', icon: <Phone /> },
            ].map(({ name, label, type = 'text', icon }) => (
              <TextField
                key={name}
                fullWidth
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
              />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
              <Button variant="outlined" color="secondary" onClick={handleReset} disabled={!hasUnsavedChanges}>
                Reset
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={!hasUnsavedChanges}>
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          User data saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserForm;


