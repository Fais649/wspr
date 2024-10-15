export const animateFocusIn = (el: HTMLElement, y: number, scale: number, z: number) => {
	el.style.transform = `translateY(${y}px) scale(${scale})`;
	el.style.zIndex = z.toString();
	el.style.width = '300px';
	el.style.position = 'fixed';
};

export const animateFocusOut = (el: HTMLElement, y: number, scale: number, z: number) => {
	el.style.transform = `translateY(${y}px) scale(${scale})`;
	el.style.position = 'relative';
	el.style.zIndex = z.toString();
};
