import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ApiService } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';
import { ErrorMapperService } from '../../core/services/error-mapper.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="demo">
      <div class="demo__header">
        <h1 class="demo__title">Error Handling Demo</h1>
        <p class="demo__subtitle">
          Test different API responses and error handling behaviors
        </p>
      </div>
      
      <div class="demo__cards">
        <div class="card card--success">
          <div class="card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h2 class="card__title">Success</h2>
          <p class="card__description">
            Returns 200 OK. Manually triggers a success toast.
          </p>
          <app-button 
            variant="secondary" 
            [loading]="loadingSuccess()"
            (click)="onSuccess()"
          >
            Test Success
          </app-button>
        </div>

        <div class="card card--error">
          <div class="card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M15 9l-6 6m0-6l6 6"/>
            </svg>
          </div>
          <h2 class="card__title">Server Error</h2>
          <p class="card__description">
            Returns 500. Interceptor handles globally.
          </p>
          <app-button 
            variant="secondary" 
            [loading]="loadingError()"
            (click)="onError()"
          >
            Test Error
          </app-button>
        </div>

        <div class="card card--warning">
          <div class="card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 class="card__title">Upgrade Required</h2>
          <p class="card__description">
            Returns 402. Component handles locally with action.
          </p>
          <app-button 
            variant="secondary" 
            [loading]="loadingUpgrade()"
            (click)="onUpgrade()"
          >
            Test Upgrade
          </app-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo {
      min-height: 100vh;
      padding: var(--space-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: 
        radial-gradient(ellipse at top, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
        var(--bg-primary);
    }

    .demo__header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }

    .demo__title {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: var(--space-sm);
    }

    .demo__subtitle {
      color: var(--text-muted);
      font-size: 1.125rem;
    }

    .demo__cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-lg);
      max-width: 960px;
      width: 100%;
    }

    .card {
      background: var(--bg-surface);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--space-md);
      border: 1px solid var(--bg-elevated);
      transition: all var(--transition-normal);
    }

    .card:hover {
      border-color: var(--bg-hover);
      transform: translateY(-2px);
    }

    .card__icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card__icon svg {
      width: 28px;
      height: 28px;
    }

    .card--success .card__icon {
      background: var(--success-bg);
      color: var(--success);
    }

    .card--error .card__icon {
      background: var(--error-bg);
      color: var(--error);
    }

    .card--warning .card__icon {
      background: var(--warning-bg);
      color: var(--warning);
    }

    .card__title {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .card__description {
      color: var(--text-muted);
      font-size: 0.875rem;
      line-height: 1.6;
    }
  `]
})
export class DemoComponent {
  private api = inject(ApiService);
  private toast = inject(ToastService);
  private errorMapper = inject(ErrorMapperService);

  loadingSuccess = signal(false);
  loadingError = signal(false);
  loadingUpgrade = signal(false);

  onSuccess(): void {
    this.loadingSuccess.set(true);
    this.api.success().pipe(
      finalize(() => this.loadingSuccess.set(false))
    ).subscribe({
      next: () => this.toast.success('Request completed successfully!'),
    });
  }

  onError(): void {
    this.loadingError.set(true);
    this.api.error().pipe(
      finalize(() => this.loadingError.set(false))
    ).subscribe();
  }

  onUpgrade(): void {
    this.loadingUpgrade.set(true);
    this.api.upgrade().pipe(
      finalize(() => this.loadingUpgrade.set(false))
    ).subscribe({
      error: (err: HttpErrorResponse) => {
        if (err.status === 402) {
          this.toast.warning(this.errorMapper.map(err), {
            label: 'Upgrade Now',
            route: '/pricing',
          });
        }
      },
    });
  }
}

