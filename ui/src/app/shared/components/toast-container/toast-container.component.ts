import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { ToastItemComponent } from '../toast-item/toast-item.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ToastItemComponent],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <app-toast-item 
          [toast]="toast" 
          (dismiss)="toastService.dismiss(toast.id)" 
        />
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: var(--space-lg);
      right: var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      z-index: 9999;
    }
  `]
})
export class ToastContainerComponent {
  protected toastService = inject(ToastService);
}

