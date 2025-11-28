import { Component, input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [class]="'btn btn--' + variant()"
      [class.btn--loading]="loading()"
      [disabled]="loading() || disabled()"
      [type]="type()"
    >
      @if (loading()) {
        <span class="btn__spinner"></span>
      }
      <span class="btn__content" [class.btn__content--hidden]="loading()">
        <ng-content />
      </span>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-lg);
      min-width: 140px;
      height: 44px;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: none;
      transition: all var(--transition-fast);
      position: relative;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn--primary {
      background: var(--accent);
      color: var(--text-primary);
    }

    .btn--primary:hover:not(:disabled) {
      background: var(--accent-hover);
    }

    .btn--secondary {
      background: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--bg-hover);
    }

    .btn--secondary:hover:not(:disabled) {
      background: var(--bg-hover);
    }

    .btn--ghost {
      background: transparent;
      color: var(--text-secondary);
    }

    .btn--ghost:hover:not(:disabled) {
      background: var(--bg-surface);
      color: var(--text-primary);
    }

    .btn__content {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .btn__content--hidden {
      visibility: hidden;
    }

    .btn__spinner {
      position: absolute;
      width: 18px;
      height: 18px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  loading = input(false);
  disabled = input(false);
  type = input<'button' | 'submit'>('button');
}

