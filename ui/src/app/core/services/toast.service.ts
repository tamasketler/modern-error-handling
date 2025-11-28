import { Injectable, signal } from '@angular/core';
import { Toast, ToastConfig } from '../models';

const DEFAULT_DURATION = 5000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  
  readonly toasts = this.toastsSignal.asReadonly();

  show(config: ToastConfig): string {
    const id = crypto.randomUUID();
    const duration = config.duration ?? DEFAULT_DURATION;
    const toast: Toast = {
      ...config,
      id,
      duration,
    };
    
    this.toastsSignal.update(current => [...current, toast]);
    
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
    
    return id;
  }

  success(message: string, action?: ToastConfig['action']): string {
    return this.show({ message, severity: 'success', action });
  }

  warning(message: string, action?: ToastConfig['action']): string {
    return this.show({ message, severity: 'warning', action });
  }

  error(message: string, action?: ToastConfig['action']): string {
    return this.show({ message, severity: 'error', action });
  }

  dismiss(id: string): void {
    this.toastsSignal.update(current => current.filter(t => t.id !== id));
  }

  dismissAll(): void {
    this.toastsSignal.set([]);
  }
}

