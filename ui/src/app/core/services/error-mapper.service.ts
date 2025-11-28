import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models';

const ERROR_MESSAGES: Record<string, string> = {
  INTERNAL_ERROR: 'Something went wrong on our end. Please try again later.',
  PLAN_UPGRADE_REQUIRED: 'This feature requires a plan upgrade.',
};

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Invalid request. Please check your input.',
  401: 'Please sign in to continue.',
  403: 'You don\'t have permission to perform this action.',
  404: 'The requested resource was not found.',
  429: 'Too many requests. Please slow down.',
  500: 'Something went wrong on our end. Please try again later.',
  502: 'Service temporarily unavailable. Please try again.',
  503: 'Service temporarily unavailable. Please try again.',
};

@Injectable({ providedIn: 'root' })
export class ErrorMapperService {
  map(error: HttpErrorResponse): string {
    const apiError = error.error as ApiError | null;
    
    if (apiError?.code && ERROR_MESSAGES[apiError.code]) {
      return ERROR_MESSAGES[apiError.code];
    }
    
    if (STATUS_MESSAGES[error.status]) {
      return STATUS_MESSAGES[error.status];
    }
    
    return 'An unexpected error occurred. Please try again.';
  }

  getNetworkError(): string {
    return 'Unable to connect. Please check your internet connection.';
  }
}

