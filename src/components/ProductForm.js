import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MuiButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ProductForm = ({ product, onSave, onCancel, onMessage }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [errors, setErrors] = useState({});
  const isEditing = !!product;

  useEffect(() => {
    setName(product ? product.name : '');
    setDescription(product ? product.description : '');
    setErrors({});
  }, [product]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Product name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      onMessage('Please correct the errors in the form.', 'error');
      return;
    }

    const productToSave = { name, description };
    try {
      await onSave(isEditing ? product.id : null, productToSave);
    } catch (error) {
      console.error("Error in ProductForm save:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Product Name"
        id="productName"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DriveFileRenameOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Description"
        id="productDescription"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <DialogActions sx={{ p: 0, justifyContent: 'flex-end' }}>
        <MuiButton onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </MuiButton>
        <MuiButton type="submit" variant="contained" color="primary">
          {isEditing ? 'Update Product' : 'Add Product'}
        </MuiButton>
      </DialogActions>
    </Box>
  );
};

export default ProductForm;
