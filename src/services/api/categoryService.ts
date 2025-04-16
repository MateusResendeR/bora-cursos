import apiClient from './client';
import { Category } from '../../types/Category';

interface ApiResponse {
  STATE: number;
  CATEGORIES: Category[];
}

export const categoryService = {
  /**
   * Fetches all categories from the API
   * @returns Promise with the categories data
   */
  async getCategories(): Promise<Category[]> {
    const formData = new FormData();
    formData.append('token', '7d397d28e2fba2e015145d521c843ed7bdd01025');
    
    try {
      const response = await apiClient.post<ApiResponse>('/api/category/get-categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.CATEGORIES || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};

export default categoryService; 