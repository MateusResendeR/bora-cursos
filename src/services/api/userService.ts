import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
}

export interface ProfileResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
  user?: UserProfile;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
}

export const userService = {
  /**
   * Get user profile
   */
  getProfile: async (): Promise<ProfileResponse> => {
    return apiClient.get<ProfileResponse>(ENDPOINTS.USER.PROFILE);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<ProfileResponse> => {
    return apiClient.post<ProfileResponse>(ENDPOINTS.USER.UPDATE_PROFILE, data);
  },

  /**
   * Change password
   */
  changePassword: async (data: ChangePasswordRequest): Promise<PasswordResponse> => {
    return apiClient.post<PasswordResponse>(ENDPOINTS.USER.CHANGE_PASSWORD, data);
  },
}; 