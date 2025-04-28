import { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  Grid
} from '@mui/material';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    area: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/predict', {
        area: parseFloat(formData.area),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms)
      });
      setPrediction(response.data.predicted_price);
      setError('');
    } catch (err) {
      setError('Error making prediction. Please try again.');
      setPrediction(null);
    }
  };

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            House Price Prediction
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Area (sq ft)"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number of Bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number of Bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  Predict Price
                </Button>
              </Grid>
            </Grid>
          </form>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {prediction && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h6" component="h2">
                Predicted Price:
              </Typography>
              <Typography variant="h4" color="primary">
                {formatINR(prediction)}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App; 