import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  icon: string;
}

export interface PaymentRequest {
  courseId: number;
  methodId: number;
  amount: number;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface Payment {
  id: number;
  courseId: number;
  courseName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  method: string;
}

export interface PaymentMethodsResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
  methods?: PaymentMethod[];
}

export interface PaymentProcessResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
  paymentId?: number;
  redirect?: string;
}

export interface PaymentHistoryResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
  payments?: Payment[];
  total?: number;
  page?: number;
}

export const paymentService = {
  /**
   * Get available payment methods
   */
  getPaymentMethods: async (): Promise<PaymentMethodsResponse> => {
    return apiClient.get<PaymentMethodsResponse>(ENDPOINTS.PAYMENTS.METHODS);
  },

  /**
   * Process a payment
   */
  processPayment: async (data: PaymentRequest): Promise<PaymentProcessResponse> => {
    return apiClient.post<PaymentProcessResponse>(ENDPOINTS.PAYMENTS.PROCESS, data);
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async (page: number = 1, limit: number = 10): Promise<PaymentHistoryResponse> => {
    return apiClient.get<PaymentHistoryResponse>(ENDPOINTS.PAYMENTS.HISTORY, {
      params: { page, limit }
    });
  },
}; 