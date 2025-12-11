const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface WaitlistRequest {
  email: string;
  name?: string;
  type: 'CREATOR' | 'COMPANY';
  company?: string;
  message?: string;
}

export interface WaitlistResponse {
  message: string;
  entry: {
    id: string;
    email: string;
    type: string;
    createdAt: string;
  };
}

export interface ApiError {
  error: string;
  errors?: Array<{ msg: string; param: string }>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async joinWaitlist(data: WaitlistRequest): Promise<WaitlistResponse> {
    return this.request<WaitlistResponse>('/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getWaitlistStats() {
    return this.request('/api/waitlist/stats');
  }

  async healthCheck() {
    return this.request('/api/health');
  }
}

export const api = new ApiClient(API_BASE_URL);


