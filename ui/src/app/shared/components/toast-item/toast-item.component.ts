import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from '../../../core/models';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  template: `
    <div class="toast" [class]="'toast--' + toast().severity">
      <div class="toast__icon">
        @switch (toast().severity) {
          @case ('success') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          }
          @case ('warning') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          }
          @case ('error') {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M15 9l-6 6m0-6l6 6"/>
            </svg>
          }
        }
      </div>
      <span class="toast__message">{{ toast().message }}</span>
      @if (toast().action) {
        <button class="toast__action" (click)="onAction()">
          {{ toast().action!.label }}
        </button>
      }
      <button class="toast__close" (click)="dismiss.emit()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .toast {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md);
      background: var(--bg-elevated);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      border-left: 3px solid;
      animation: slideIn 0.25s ease-out;
      width: 360px;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .toast--success {
      border-color: var(--success);
    }

    .toast--warning {
      border-color: var(--warning);
    }

    .toast--error {
      border-color: var(--error);
    }

    .toast__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .toast--success .toast__icon {
      color: var(--success);
    }

    .toast--warning .toast__icon {
      color: var(--warning);
    }

    .toast--error .toast__icon {
      color: var(--error);
    }

    .toast__icon svg {
      width: 100%;
      height: 100%;
    }

    .toast__message {
      flex: 1;
      font-size: 0.875rem;
      color: var(--text-primary);
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .toast__action {
      flex-shrink: 0;
      padding: var(--space-xs) var(--space-sm);
      background: transparent;
      border: 1px solid var(--accent);
      border-radius: var(--radius-sm);
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .toast__action:hover {
      background: var(--accent);
      color: var(--text-primary);
    }

    .toast__close {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      padding: 0;
      background: transparent;
      border: none;
      color: var(--text-muted);
      transition: color var(--transition-fast);
    }

    .toast__close:hover {
      color: var(--text-primary);
    }

    .toast__close svg {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ToastItemComponent {
  toast = input.required<Toast>();
  dismiss = output<void>();

  constructor(private router: Router) {}

  onAction(): void {
    const action = this.toast().action;
    if (!action) return;
    
    if (action.route) {
      this.router.navigate([action.route]);
    }
    
    if (action.callback) {
      action.callback();
    }
    
    this.dismiss.emit();
  }
}

