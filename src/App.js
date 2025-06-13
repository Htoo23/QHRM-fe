import React, { useState, useEffect, useCallback } from 'react';
import ProductTable from './components/ProductTable'; // Removed .js extension
import AddProductPage from './components/AddProductPage'; // Removed .js extension
import EditProductPage from './components/EditProductPage'; // Removed .js extension
import DeleteProductPage from './components/DeleteProductPage'; // Removed .js extension
import ViewProductPage from './components/ViewProductPage'; // Removed .js extension
import ProductService from './services/ProductService'; // Removed .js extension
import Button from './components/common/Button'; // Removed .js extension
import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ open: false, text: '', type: '' });
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedProductForAction, setSelectedProductForAction] = useState(null);

  const displayMessage = useCallback((text, type) => {
    setMessage({ open: true, text, type });
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage((prev) => ({ ...prev, open: false }));
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductService.getAllProducts();
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedData);
    } catch (err) {
      setError('Failed to load products.');
      console.error('Error fetching products:', err);
      displayMessage('Failed to load products.', 'error');
    } finally {
      setLoading(false);
    }
  }, [displayMessage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSaveProduct = async (id, productData) => {
    try {
      if (id) {
        await ProductService.updateProduct(id, productData);
      } else {
        await ProductService.addProduct(productData);
      }
      await fetchProducts();
      displayMessage(`Product ${id ? 'updated' : 'added'} successfully!`, 'success');
      setCurrentPage('list');
      setSelectedProductForAction(null);
      return true;
    } catch (err) {
      displayMessage(`Failed to ${id ? 'update' : 'add'} product: ${err.message}`, 'error');
      console.error(`Error saving product (ID: ${id || 'new'}):`, err);
      throw err;
    }
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await ProductService.deleteProduct(id);
      await fetchProducts();
      displayMessage('Product deleted successfully!', 'success');
      setCurrentPage('list');
      setSelectedProductForAction(null);
    } catch (err) {
      displayMessage(`Failed to delete product: ${err.message}`, 'error');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToAddProduct = () => {
    setSelectedProductForAction(null);
    setCurrentPage('addProduct');
  };

  const handleNavigateToEditProduct = (product) => {
    setSelectedProductForAction(product);
    setCurrentPage('editProduct');
  };

  const handleNavigateToDeleteProduct = (product) => {
    setSelectedProductForAction(product);
    setCurrentPage('deleteProduct');
  };

  const handleNavigateToViewProduct = (product) => {
    setSelectedProductForAction(product);
    setCurrentPage('viewProduct');
  };

  const handleCancelAction = () => {
    setCurrentPage('list');
    setSelectedProductForAction(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          .MuiTableHead-root .MuiTableCell-root {
            white-space: nowrap;
          }
        `}</style>

        <Box className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
          {message.text && (
            <div className={`p-3 rounded-md mb-4 text-sm font-medium ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {currentPage === 'list' && (
            <React.Fragment>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
                <Button onClick={handleNavigateToAddProduct} variant="primary">
                  <AddIcon sx={{ fontSize: '1.25rem', mr: 1 }} />
                  Add Product
                </Button>
              </div>
              <ProductTable
                products={products}
                loading={loading}
                error={error}
                onView={handleNavigateToViewProduct}
                onEdit={handleNavigateToEditProduct}
                onDelete={handleNavigateToDeleteProduct}
                onRetry={fetchProducts}
              />
            </React.Fragment>
          )}

          {currentPage === 'addProduct' && (
            <AddProductPage
              onSave={handleSaveProduct}
              onCancel={handleCancelAction}
              onMessage={displayMessage}
            />
          )}

          {currentPage === 'editProduct' && selectedProductForAction && (
            <EditProductPage
              product={selectedProductForAction}
              onSave={handleSaveProduct}
              onCancel={handleCancelAction}
              onMessage={displayMessage}
            />
          )}

          {currentPage === 'deleteProduct' && selectedProductForAction && (
            <DeleteProductPage
              product={selectedProductForAction}
              onDeleteConfirm={handleDeleteProduct}
              onCancel={handleCancelAction}
              onMessage={displayMessage}
            />
          )}

          {currentPage === 'viewProduct' && selectedProductForAction && (
            <ViewProductPage
              product={selectedProductForAction}
              onBack={handleCancelAction}
            />
          )}
        </Box>
      </div>

      <Snackbar
        open={message.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
