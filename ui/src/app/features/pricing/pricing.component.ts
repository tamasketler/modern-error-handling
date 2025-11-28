import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="pricing">
      <a routerLink="/demo" class="pricing__back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
        </svg>
        Back to Demo
      </a>

      <div class="pricing__header">
        <h1 class="pricing__title">Choose your plan</h1>
        <p class="pricing__subtitle">
          Unlock premium features with a plan that fits your needs
        </p>
      </div>

      <div class="pricing__grid">
        @for (plan of plans; track plan.name) {
          <div class="plan" [class.plan--highlighted]="plan.highlighted">
            @if (plan.highlighted) {
              <span class="plan__badge">Popular</span>
            }
            <h2 class="plan__name">{{ plan.name }}</h2>
            <div class="plan__price">
              <span class="plan__amount">\${{ plan.price }}</span>
              <span class="plan__period">/{{ plan.period }}</span>
            </div>
            <ul class="plan__features">
              @for (feature of plan.features; track feature) {
                <li class="plan__feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {{ feature }}
                </li>
              }
            </ul>
            <app-button 
              [variant]="plan.highlighted ? 'primary' : 'secondary'"
            >
              Get Started
            </app-button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .pricing {
      min-height: 100vh;
      padding: var(--space-xl);
      background: 
        radial-gradient(ellipse at bottom right, rgba(234, 179, 8, 0.08) 0%, transparent 50%),
        var(--bg-primary);
    }

    .pricing__back {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-bottom: var(--space-xl);
      transition: color var(--transition-fast);
    }

    .pricing__back:hover {
      color: var(--text-primary);
    }

    .pricing__back svg {
      width: 18px;
      height: 18px;
    }

    .pricing__header {
      text-align: center;
      margin-bottom: var(--space-xl);
    }

    .pricing__title {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: var(--space-sm);
    }

    .pricing__subtitle {
      color: var(--text-muted);
      font-size: 1.125rem;
    }

    .pricing__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-lg);
      max-width: 1000px;
      margin: 0 auto;
    }

    .plan {
      position: relative;
      background: var(--bg-surface);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      border: 1px solid var(--bg-elevated);
      transition: all var(--transition-normal);
    }

    .plan:hover {
      border-color: var(--bg-hover);
    }

    .plan--highlighted {
      border-color: var(--accent);
      background: linear-gradient(
        to bottom,
        rgba(99, 102, 241, 0.1) 0%,
        var(--bg-surface) 100%
      );
    }

    .plan__badge {
      position: absolute;
      top: calc(var(--space-md) * -1);
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent);
      color: var(--text-primary);
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .plan__name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    .plan__price {
      margin-bottom: var(--space-lg);
    }

    .plan__amount {
      font-size: 3rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .plan__period {
      color: var(--text-muted);
      font-size: 1rem;
    }

    .plan__features {
      list-style: none;
      margin-bottom: var(--space-lg);
      flex: 1;
    }

    .plan__feature {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--text-secondary);
      font-size: 0.875rem;
      padding: var(--space-sm) 0;
    }

    .plan__feature svg {
      width: 18px;
      height: 18px;
      color: var(--success);
      flex-shrink: 0;
    }
  `]
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      name: 'Starter',
      price: 9,
      period: 'month',
      highlighted: false,
      features: [
        '5 projects',
        '10GB storage',
        'Basic analytics',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: 29,
      period: 'month',
      highlighted: true,
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
      ],
    },
    {
      name: 'Enterprise',
      price: 99,
      period: 'month',
      highlighted: false,
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom training',
      ],
    },
  ];
}

