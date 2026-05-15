type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
}

class ToastState {
	items = $state<Toast[]>([]);

	add(message: string, type: ToastType = 'info', duration: number = 3000) {
		const id = Math.random().toString(36).substring(2, 9);
		const toast: Toast = { id, message, type, duration };
		
		this.items = [...this.items, toast];

		if (duration > 0) {
			setTimeout(() => this.remove(id), duration);
		}
		
		return id;
	}

	remove(id: string) {
		this.items = this.items.filter(item => item.id !== id);
	}

	success(message: string, duration?: number) { return this.add(message, 'success', duration); }
	error(message: string, duration?: number) { return this.add(message, 'error', duration); }
	info(message: string, duration?: number) { return this.add(message, 'info', duration); }
	warning(message: string, duration?: number) { return this.add(message, 'warning', duration); }
}

export const toasts = new ToastState();
