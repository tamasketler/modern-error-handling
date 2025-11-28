import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = '/api/demo';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  success(): Observable<void> {
    return this.http.get<void>(`${BASE_URL}/success`);
  }

  error(): Observable<void> {
    return this.http.get<void>(`${BASE_URL}/error`);
  }

  upgrade(): Observable<void> {
    return this.http.get<void>(`${BASE_URL}/upgrade`);
  }
}

