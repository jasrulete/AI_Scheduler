import axios from 'axios';
import { getSession } from '@/lib/auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Error getting session:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Log the error details
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
        },
      });

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        // Clear session and redirect to login
        localStorage.removeItem('supabase.auth.token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // User management
  users: {
    verifyToken: '/users/auth/verify/',
    profile: '/users/profile/',
  },
  // Service catalog
  services: {
    list: '/service_catalog/services/',
    create: '/service_catalog/services/',
    update: (id: string) => `/service_catalog/services/${id}/`,
    delete: (id: string) => `/service_catalog/services/${id}/`,
  },
  // Calendar management
  calendar: {
    events: {
      list: '/calendar_mgmt/events/',
      create: '/calendar_mgmt/events/',
      update: (id: string) => `/calendar_mgmt/events/${id}/`,
      delete: (id: string) => `/calendar_mgmt/events/${id}/`,
    },
    bookings: {
      list: '/calendar_mgmt/bookings/',
      create: '/calendar_mgmt/bookings/',
      update: (id: string) => `/calendar_mgmt/bookings/${id}/`,
      delete: (id: string) => `/calendar_mgmt/bookings/${id}/`,
    },
  },
  // Customer management
  customers: {
    list: '/customer_mgmt/',
    create: '/customer_mgmt/',
    update: (id: string) => `/customer_mgmt/${id}/`,
    delete: (id: string) => `/customer_mgmt/${id}/`,
  },
};

export const userService = {
  verifyToken: async (accessToken: string) => {
    try {
      const response = await api.post(apiEndpoints.users.verifyToken, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get(apiEndpoints.users.profile);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};

export const customerAPI = {
  getAll: async () => {
    try {
      const response = await api.get(apiEndpoints.customers.list);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  create: async (customer: any) => {
    try {
      const response = await api.post(apiEndpoints.customers.create, customer);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  update: async (id: string, customer: any) => {
    try {
      const response = await api.put(apiEndpoints.customers.update(id), customer);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  delete: async (id: string) => {
    try {
      const response = await api.delete(apiEndpoints.customers.delete(id));
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }
};

export const serviceAPI = {
  getAll: async () => {
    try {
      const response = await api.get(apiEndpoints.services.list);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  create: async (service: any) => {
    try {
      const response = await api.post(apiEndpoints.services.create, service);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  update: async (id: string, service: any) => {
    try {
      const response = await api.put(apiEndpoints.services.update(id), service);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  delete: async (id: string) => {
    try {
      const response = await api.delete(apiEndpoints.services.delete(id));
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }
};

export const bookingAPI = {
  getAll: async () => {
    try {
      const response = await api.get(apiEndpoints.calendar.bookings.list);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  create: async (booking: any) => {
    try {
      const response = await api.post(apiEndpoints.calendar.bookings.create, booking);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  update: async (id: string, booking: any) => {
    try {
      const response = await api.put(apiEndpoints.calendar.bookings.update(id), booking);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  delete: async (id: string) => {
    try {
      const response = await api.delete(apiEndpoints.calendar.bookings.delete(id));
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
  getEvents: async () => {
    try {
      const response = await api.get(apiEndpoints.calendar.events.list);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }
};

export default api; 