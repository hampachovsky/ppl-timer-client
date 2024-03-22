import { AppConfig } from '@/common';

class RequestClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async request(url: string, options: RequestInit, token?: string): Promise<any> {
    const headers = new Headers(options.headers);

    headers.append('Content-Type', 'application/json');

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(this.baseURL + url, { ...options, headers });
    if (!response.ok) {
      throw { status: response.status, statusText: response.statusText };
    }
    return response.json();
  }
}

export const fetchClient = new RequestClient(AppConfig.apiUrl);
