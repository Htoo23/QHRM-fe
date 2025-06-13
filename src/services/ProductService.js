
const ProductService = {
  BASE_URL: 'https://localhost:7142/api/Products',

  /**
   * @returns {Promise<Array<Object>>} 
   * @throws {Error} 
   */
  getAllProducts: async () => {
    try {
      const response = await fetch(ProductService.BASE_URL);
      if (!response.ok) {
        const errorData = await response.text(); 
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      const data = await response.json(); 
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; 
    }
  },

  /**
   * @param {Object} product 
   * @returns {Promise<Object>} 
   * @throws {Error} 
   */
  addProduct: async (product) => {
    try {
      const response = await fetch(ProductService.BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(product), 
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      const data = await response.json(); 
      return data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  /**
   * @param {number|string} id 
   * @param {Object} updatedFields 
   * @returns {Promise<Object>}
   * @throws {Error} 
   */
  updateProduct: async (id, updatedFields) => {
    try {
      const response = await fetch(`${ProductService.BASE_URL}/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      if (response.status === 204) {
        return { success: true }; 
      }
      return await response.json(); 
    } catch (error) {
      console.error(`Error updating product (ID: ${id}):`, error);
      throw error;
    }
  },

  /**
   * @param {number|string} id 
   * @returns {Promise<Object>} 
   * @throws {Error} 
   */
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${ProductService.BASE_URL}/${id}`, {
        method: 'DELETE', 
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      return { success: true }; 
    } catch (error) {
      console.error(`Error deleting product (ID: ${id}):`, error);
      throw error;
    }
  },
};

export default ProductService;
