import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

const DeleteProductPage = ({ product, onDeleteConfirm, onCancel, onMessage }) => {

  const handleDeleteClick = async () => {
    try {
      await onDeleteConfirm(product.id);
    } catch (error) {
      onMessage(`Failed to delete product: ${error.message}`, 'error');
      console.error("Error deleting product from DeleteProductPage:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Delete Product
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Are you sure you want to delete the product:
      </Typography>
      <Typography variant="h6" component="p" color="error" sx={{ mb: 4 }}>
        "{product.name}" (ID: {product.id})?
      </Typography>
      <DialogActions sx={{ p: 0, justifyContent: 'center', gap: 2 }}>
        <MuiButton onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </MuiButton>
        <MuiButton onClick={handleDeleteClick} variant="contained" color="error">
          Confirm Delete
        </MuiButton>
      </DialogActions>
    </Box>
  );
};

export default DeleteProductPage;
