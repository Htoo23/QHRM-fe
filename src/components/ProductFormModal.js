  import React from 'react';
  import Modal from './common/Modal';
  import ProductForm from './ProductForm'; 

  const ProductFormModal = ({ isOpen, onClose, product, onSave, onMessage }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Add New Product'}>
        <ProductForm
          product={product}
          onSave={(id, productData) => onSave(id, productData).then(() => onClose())}
          onCancel={onClose}
          onMessage={onMessage}
        />
      </Modal>
    );
  };

  export default ProductFormModal;
