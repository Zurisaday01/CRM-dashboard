import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// help to convert database title names to human readable names (tables names)
export const toTitleCase = (str: string) => {
	return str.replace(/\b\w/g, function (char) {
		return char.toUpperCase();
	});
};
