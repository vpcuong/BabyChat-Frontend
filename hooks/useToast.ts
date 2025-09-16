import toast, { type Toast, type ToastOptions } from 'react-hot-toast';

export interface CustomToastOptions extends Partial<ToastOptions> {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface ToastMethods {
  success: (message: string, options?: CustomToastOptions) => string;
  error: (message: string, options?: CustomToastOptions) => string;
  info: (message: string, options?: CustomToastOptions) => string;
  warning: (message: string, options?: CustomToastOptions) => string;
  loading: (message: string, options?: CustomToastOptions) => string;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => Promise<T>;
  dismiss: (toastId?: string) => void;
  dismissAll: () => void;
  custom: (jsx: React.ReactNode, options?: CustomToastOptions) => string;
}

export const useToast = (defaultOptions?: CustomToastOptions): ToastMethods => {
  const mergeOptions = (options?: CustomToastOptions): CustomToastOptions => ({
    duration: 4000,
    ...defaultOptions,
    ...options,
  });

  const success = (message: string, options?: CustomToastOptions): string => {
    return toast.success(message, {
      ...mergeOptions(options),
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: '500',
        borderRadius: '8px',
        ...mergeOptions(options).style,
      },
    });
  };

  const error = (message: string, options?: CustomToastOptions): string => {
    return toast.error(message, {
      ...mergeOptions(options),
      duration: 5000, // Error toast stays longer
      style: {
        background: '#ef4444',
        color: '#fff',
        fontWeight: '500',
        borderRadius: '8px',
        ...mergeOptions(options).style,
      },
    });
  };

  const info = (message: string, options?: CustomToastOptions): string => {
    return toast(message, {
      ...mergeOptions(options),
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
        fontWeight: '500',
        borderRadius: '8px',
        ...mergeOptions(options).style,
      },
    });
  };

  const warning = (message: string, options?: CustomToastOptions): string => {
    return toast(message, {
      ...mergeOptions(options),
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#000',
        fontWeight: '500',
        borderRadius: '8px',
        ...mergeOptions(options).style,
      },
    });
  };

  const loading = (message: string, options?: CustomToastOptions): string => {
    return toast.loading(message, {
      ...mergeOptions(options),
      duration: Infinity, // Loading toast doesn't auto-dismiss
      style: {
        background: '#6b7280',
        color: '#fff',
        fontWeight: '500',
        borderRadius: '8px',
        ...mergeOptions(options).style,
      },
    });
  };

  const promise = <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    return toast.promise(promise, options);
  };

  const dismiss = (toastId?: string): void => {
    toast.dismiss(toastId);
  };

  const dismissAll = (): void => {
    toast.dismiss();
  };

  const custom = (jsx: React.ReactNode, options?: CustomToastOptions): string => {
    return toast.custom(jsx, mergeOptions(options));
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    promise,
    dismiss,
    dismissAll,
    custom,
  };
};