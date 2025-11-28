import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMapperService } from './error-mapper.service';

describe('ErrorMapperService', () => {
  let service: ErrorMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('map()', () => {
    it('should return message for INTERNAL_ERROR code', () => {
      const error = new HttpErrorResponse({
        error: { code: 'INTERNAL_ERROR' },
        status: 500,
      });
      expect(service.map(error)).toBe(
        'Something went wrong on our end. Please try again later.'
      );
    });

    it('should return message for PLAN_UPGRADE_REQUIRED code', () => {
      const error = new HttpErrorResponse({
        error: { code: 'PLAN_UPGRADE_REQUIRED' },
        status: 403,
      });
      expect(service.map(error)).toBe('This feature requires a plan upgrade.');
    });

    it('should return message for 400 status', () => {
      const error = new HttpErrorResponse({ status: 400 });
      expect(service.map(error)).toBe(
        'Invalid request. Please check your input.'
      );
    });

    it('should return message for 401 status', () => {
      const error = new HttpErrorResponse({ status: 401 });
      expect(service.map(error)).toBe('Please sign in to continue.');
    });

    it('should return message for 403 status', () => {
      const error = new HttpErrorResponse({ status: 403 });
      expect(service.map(error)).toBe(
        "You don't have permission to perform this action."
      );
    });

    it('should return message for 404 status', () => {
      const error = new HttpErrorResponse({ status: 404 });
      expect(service.map(error)).toBe('The requested resource was not found.');
    });

    it('should return message for 429 status', () => {
      const error = new HttpErrorResponse({ status: 429 });
      expect(service.map(error)).toBe('Too many requests. Please slow down.');
    });

    it('should return message for 500 status', () => {
      const error = new HttpErrorResponse({ status: 500 });
      expect(service.map(error)).toBe(
        'Something went wrong on our end. Please try again later.'
      );
    });

    it('should return message for 502 status', () => {
      const error = new HttpErrorResponse({ status: 502 });
      expect(service.map(error)).toBe(
        'Service temporarily unavailable. Please try again.'
      );
    });

    it('should return message for 503 status', () => {
      const error = new HttpErrorResponse({ status: 503 });
      expect(service.map(error)).toBe(
        'Service temporarily unavailable. Please try again.'
      );
    });

    it('should return fallback message for unknown status', () => {
      const error = new HttpErrorResponse({ status: 418 });
      expect(service.map(error)).toBe(
        'An unexpected error occurred. Please try again.'
      );
    });

    it('should prioritize error code over status code', () => {
      const error = new HttpErrorResponse({
        error: { code: 'PLAN_UPGRADE_REQUIRED' },
        status: 500,
      });
      expect(service.map(error)).toBe('This feature requires a plan upgrade.');
    });
  });

  describe('getNetworkError()', () => {
    it('should return network error message', () => {
      expect(service.getNetworkError()).toBe(
        'Unable to connect. Please check your internet connection.'
      );
    });
  });
});

