import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show()', () => {
    it('should add a toast to the list', () => {
      service.show({ message: 'Test message', severity: 'success' });

      expect(service.toasts().length).toBe(1);
      expect(service.toasts()[0].message).toBe('Test message');
      expect(service.toasts()[0].severity).toBe('success');
    });

    it('should return a unique id', () => {
      const id1 = service.show({ message: 'First', severity: 'success' });
      const id2 = service.show({ message: 'Second', severity: 'error' });

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    it('should use default duration when not specified', () => {
      service.show({ message: 'Test', severity: 'success' });

      expect(service.toasts()[0].duration).toBe(5000);
    });

    it('should use custom duration when specified', () => {
      service.show({ message: 'Test', severity: 'success', duration: 3000 });

      expect(service.toasts()[0].duration).toBe(3000);
    });

    it('should auto-dismiss after duration', fakeAsync(() => {
      service.show({ message: 'Test', severity: 'success', duration: 1000 });

      expect(service.toasts().length).toBe(1);

      tick(1000);

      expect(service.toasts().length).toBe(0);
    }));

    it('should not auto-dismiss when duration is 0', fakeAsync(() => {
      service.show({ message: 'Test', severity: 'success', duration: 0 });

      expect(service.toasts().length).toBe(1);

      tick(10000);

      expect(service.toasts().length).toBe(1);
    }));
  });

  describe('success()', () => {
    it('should create a success toast', () => {
      service.success('Success message');

      expect(service.toasts()[0].severity).toBe('success');
      expect(service.toasts()[0].message).toBe('Success message');
    });

    it('should support action parameter', () => {
      const action = { label: 'Undo', callback: jest.fn() };
      service.success('Success message', action);

      expect(service.toasts()[0].action).toEqual(action);
    });
  });

  describe('warning()', () => {
    it('should create a warning toast', () => {
      service.warning('Warning message');

      expect(service.toasts()[0].severity).toBe('warning');
      expect(service.toasts()[0].message).toBe('Warning message');
    });

    it('should support action parameter', () => {
      const action = { label: 'Dismiss', callback: jest.fn() };
      service.warning('Warning message', action);

      expect(service.toasts()[0].action).toEqual(action);
    });
  });

  describe('error()', () => {
    it('should create an error toast', () => {
      service.error('Error message');

      expect(service.toasts()[0].severity).toBe('error');
      expect(service.toasts()[0].message).toBe('Error message');
    });

    it('should support action parameter', () => {
      const action = { label: 'Retry', callback: jest.fn() };
      service.error('Error message', action);

      expect(service.toasts()[0].action).toEqual(action);
    });
  });

  describe('dismiss()', () => {
    it('should remove a specific toast by id', () => {
      const id1 = service.show({ message: 'First', severity: 'success' });
      service.show({ message: 'Second', severity: 'error' });

      expect(service.toasts().length).toBe(2);

      service.dismiss(id1);

      expect(service.toasts().length).toBe(1);
      expect(service.toasts()[0].message).toBe('Second');
    });

    it('should do nothing if id does not exist', () => {
      service.show({ message: 'Test', severity: 'success' });

      service.dismiss('non-existent-id');

      expect(service.toasts().length).toBe(1);
    });
  });

  describe('dismissAll()', () => {
    it('should remove all toasts', () => {
      service.show({ message: 'First', severity: 'success' });
      service.show({ message: 'Second', severity: 'error' });
      service.show({ message: 'Third', severity: 'warning' });

      expect(service.toasts().length).toBe(3);

      service.dismissAll();

      expect(service.toasts().length).toBe(0);
    });
  });
});

