import React from 'react';
import ProductForm from './ProductForm'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AddProductPage = ({ onSave, onCancel, onMessage }) => {

  const handleFormSave = async (id, productData) => {
    try {
      await onSave(id, productData);
    } catch (error) {
      console.error("Error saving product from AddProductPage:", error);
      throw error;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Add New Product
      </Typography>
      <ProductForm
        product={null}
        onSave={handleFormSave}
        onCancel={onCancel}
        onMessage={onMessage}
      />
    </Box>
  );
};

export default AddProductPage;
