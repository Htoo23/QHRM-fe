import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from './common/Button'; 
import { formatDate } from '../utils/formatDate'; 
const ProductTable = ({ products, loading, error, onEdit, onDelete, onRetry, onView }) => { 
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2, color: 'text.secondary' }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>{error}</Typography>
        <Button onClick={onRetry} variant="secondary">Retry</Button>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
        <Typography variant="h6">No products found. Click "Add Product" to get started!</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="product table">
        <TableHead sx={{ backgroundColor: '#f9fafb' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280' }}>SN</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280' }}>Product</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280' }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280' }}>Created</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': { backgroundColor: '#fefefe' } }}
            >
              <TableCell sx={{ color: '#4b5563' }}>{index + 1}</TableCell>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'medium', color: '#1f2937' }}>
                {product.name}
              </TableCell>
              <TableCell sx={{ color: '#4b5563' }}>{product.description}</TableCell>
              <TableCell sx={{ color: '#6b7280' }}>{formatDate(product.createdAt)}</TableCell>
              <TableCell align="right">
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => onView(product)}
                    className="!p-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <VisibilityIcon sx={{ fontSize: '1rem' }} />
                  </Button>
                  <Button
                    onClick={() => onEdit(product)}
                    className="!p-1 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <EditIcon sx={{ fontSize: '1rem' }} />
                  </Button>
                  <Button
                    onClick={() => onDelete(product)}
                    className="!p-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <DeleteIcon sx={{ fontSize: '1rem' }} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
