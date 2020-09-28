import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 2 minutes for caching
const maxAge = 120000;

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  private cache = new Map();

  constructor() {}

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    console.log(url);
    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < Date.now() - maxAge;
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = request.urlWithParams;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

  clear(): void {
    this.cache.clear();
  }
}
