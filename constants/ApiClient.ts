import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from './Config';

// Types for API responses and errors
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public data?: any,
    message?: string
  ) {
    super(message || `API Error ${status}`);
    this.name = 'ApiError';
  }
}

// Configuration for Axios instance
const createAxiosConfig = (): AxiosRequestConfig => ({
  // Use the base URL according to the current environment
  baseURL: Config.baseUrls[Config.environment],
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Axios instance with interceptors
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create(createAxiosConfig());
  }



  // HTTP Methods
  public async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(endpoint, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  public async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(endpoint, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  public async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(endpoint, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  public async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(endpoint, config);
    return {
      data: response.data,
      status: response.status,
    };
  }

  public async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(endpoint, data, config);
    return {
      data: response.data,
      status: response.status,
    };
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in other modules
export type { AxiosRequestConfig, AxiosResponse };
