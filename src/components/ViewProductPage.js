import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import { formatDate }  from '../utils/formatDate'; 


const ViewProductPage = ({ product, onBack }) => {
  if (!product) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h6" color="error">Product not found.</Typography>
        <MuiButton onClick={onBack} variant="contained" sx={{ mt: 3 }}>
          Back to List
        </MuiButton>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', backgroundColor: '#f9fafb', borderRadius: '8px', boxShadow: 1 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center', color: '#1f2937' }}>
        Product Details
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#4b5563' }}>
          Product Name:
        </Typography>
        <Typography variant="body1" component="div" sx={{ color: '#1f2937' }}>
          {product.name}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#4b5563' }}>
          Description:
        </Typography>
        <Typography variant="body1" component="div" sx={{ color: '#1f2937' }}>
          {product.description}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#4b5563' }}>
          Created At:
        </Typography>
        <Typography variant="body1" component="div" sx={{ color: '#1f2937' }}>
          {formatDate(product.createdAt)}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#4b5563' }}>
          Product ID:
        </Typography>
        <Typography variant="body2" component="div" sx={{ fontStyle: 'italic', color: '#6b7280' }}>
          {product.id}
        </Typography>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <MuiButton onClick={onBack} variant="contained" color="primary">
          Back to Product List
        </MuiButton>
      </Box>
    </Box>
  );
};

export default ViewProductPage;
