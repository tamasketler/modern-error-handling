export type ToastSeverity = 'success' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  route?: string;
  callback?: () => void;
}

export interface ToastConfig {
  message: string;
  severity: ToastSeverity;
  duration?: number;
  action?: ToastAction;
}

export interface Toast extends ToastConfig {
  id: string;
}

