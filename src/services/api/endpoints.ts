export const ENDPOINTS = {
  // Define all API endpoints here
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
    CHANGE_PASSWORD: '/user/password/change',
  },
  PAYMENTS: {
    METHODS: '/payments/methods',
    PROCESS: '/payments/process',
    HISTORY: '/payments/history',
  },
}; 