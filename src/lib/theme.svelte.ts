import { browser } from '$app/environment';

const initialTheme = browser 
	? (localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
	: 'light';

class ThemeState {
	current = $state(initialTheme);

	constructor() {
		if (browser) {
			this.apply(this.current);
		}
	}

	toggle() {
		this.current = this.current === 'light' ? 'dark' : 'light';
		this.apply(this.current);
	}

	private apply(t: string) {
		if (browser) {
			localStorage.setItem('theme', t);
			document.documentElement.classList.toggle('dark', t === 'dark');
			document.documentElement.style.colorScheme = t;
		}
	}
}

export const theme = new ThemeState();
