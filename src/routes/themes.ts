
export const themes = [
	'light',
	'dark',
	'gruvbox',
	'tokyonight',
	'rosepine',
	'rosepine_light',
	'pink_light',
	'pink_dark',
	'cyberpunk_light',
	'cyberpunk_dark',
];

export const r = document.documentElement;
export function updateCSSVariables(mode) {
	const properties = {
		light: {
			'--background': '#ffffff', // White
			'--foreground': '240 10% 3.9%', // Dark color

			'--muted': '240 4.8% 95.9%',
			'--muted-foreground': '240 3.8% 46.1%',

			'--popover': '0 0% 100%',
			'--popover-foreground': '240 10% 3.9%',

			'--card': '0 0% 100%',
			'--card-foreground': '240 10% 3.9%',

			'--border': '#000000',
			'--input': '240 5.9% 90%',

			'--primary': '240 5.9% 10%',
			'--primary-foreground': '0 0% 98%',

			'--secondary': '240 4.8% 95.9%',
			'--secondary-foreground': '240 5.9% 10%',

			'--accent': '240 4.8% 95.9%',
			'--accent-foreground': '240 5.9% 10%',

			'--destructive': '0 84.2% 60.2%',
			'--destructive-foreground': '0 0% 98%',

			'--ring': '240 5% 64.9%',

			'--radius': '0.5rem'
		},
		dark: {
			'--background': '#000000', // Black
			'--foreground': '#ffffff', // White

			'--muted': '240 3.7% 15.9%',
			'--muted-foreground': '240 5% 64.9%',

			'--popover': '240 10% 3.9%',
			'--popover-foreground': '0 0% 98%',

			'--card': '240 10% 3.9%',
			'--card-foreground': '0 0% 98%',

			'--border': '0 0% 100%',
			'--input': '0 0 0',

			'--primary': '0 0% 98%',
			'--primary-foreground': '240 5.9% 10%',

			'--secondary': '240 3.7% 15.9%',
			'--secondary-foreground': '0 0% 98%',

			'--accent': '240 3.7% 15.9%',
			'--accent-foreground': '0 0% 98%',

			'--destructive': '0 62.8% 30.6%',
			'--destructive-foreground': '0 85.7% 97.3%',

			'--ring': '240 3.7% 15.9%',

			'--radius': '0.5rem'
		},
		gruvbox: {
			'--background': '#282828', // Gruvbox dark background
			'--foreground': '#ebdbb2', // Gruvbox light beige

			'--muted': '30 8% 22%', // Gruvbox dark muted brown
			'--muted-foreground': '30 15% 66%', // Gruvbox light muted beige

			'--popover': '0 0% 16%', // Gruvbox medium brown background
			'--popover-foreground': '42 40% 92%', // Gruvbox light text color

			'--card': '30 8% 22%', // Gruvbox medium brown background
			'--card-foreground': '42 40% 92%', // Gruvbox light text color

			'--border': '#000000', // Gruvbox dark gray-brown
			'--input': '30 8% 22%', // Gruvbox medium brown for inputs

			'--primary': '90 70% 73%', // Gruvbox bright green (primary color)
			'--primary-foreground': '30 8% 16%', // Gruvbox dark background

			'--secondary': '40 65% 75%', // Gruvbox yellow-orange
			'--secondary-foreground': '30 8% 16%', // Gruvbox dark background

			'--accent': '43 59% 81%', // Gruvbox bright yellow
			'--accent-foreground': '30 8% 16%', // Gruvbox dark background

			'--destructive': '0 90% 70%', // Gruvbox red for destructive actions
			'--destructive-foreground': '45 80% 97%', // Gruvbox light background

			'--ring': '40 85% 63%', // Gruvbox bright orange

			'--radius': '0.5rem' // Border radius remains unchanged
		},
		tokyonight: {
			'--background': '#1a1b26', // Tokyo Night dark background (deep navy)
			'--foreground': '#c0caf5', // Light foreground (soft bluish-white text)

			'--muted': '220 13% 18%', // Muted tone (dark blueish-gray) equivalent to #16161e
			'--muted-foreground': '220 30% 65%', // Muted foreground tone (medium blue-gray)

			'--popover': '235 19% 18%', // Popover background, same as muted (#16161e)
			'--popover-foreground': '220 28% 87%', // Light foreground for popovers (bluish white)

			'--card': '220 13% 18%', // Card background, same as muted (#16161e)
			'--card-foreground': '220 28% 87%', // Foreground for cards, bluish white

			'--border': '#000000', // Dark grayish-blue border
			'--input': '220 13% 18%', // Same as muted background for input fields

			'--primary': '225 70% 64%', // Primary color (vibrant blue) from Tokyo Night palette (#7aa2f7)
			'--primary-foreground': '220 28% 87%', // Light bluish-white for primary foreground

			'--secondary': '260 55% 68%', // Secondary color (vibrant purple) from Tokyo Night palette (#bb9af7)
			'--secondary-foreground': '220 28% 87%', // Light bluish-white for secondary foreground

			'--accent': '0 85% 65%', // Accent color (reddish) inspired by Tokyo Night's red (#f7768e)
			'--accent-foreground': '220 28% 87%', // Light bluish-white for accent foreground

			'--destructive': '0 85% 60%', // Destructive color (reddish) for warnings (#f7768e)
			'--destructive-foreground': '220 28% 87%', // Light foreground for destructive elements

			'--ring': '220 55% 50%', // Tokyo Night blue ring color for focused elements (#7aa2f7)

			'--radius': '0.5rem' // Keep border radius unchanged
		},
		rosepine: {
			'--background': '#191724', // Rose Pine dark background (deep purple)
			'--foreground': '#e0def4', // Light foreground (soft off-white text)

			'--muted': '285 25% 13%', // Muted tone (dark purple-gray) equivalent to #1f1d2e
			'--muted-foreground': '285 15% 70%', // Muted foreground tone (light pinkish-purple)

			'--popover': '285 25% 13%', // Popover background, same as muted (#1f1d2e)
			'--popover-foreground': '285 15% 85%', // Light foreground for popovers (soft off-white)

			'--card': '285 25% 13%', // Card background, same as muted (#1f1d2e)
			'--card-foreground': '285 15% 85%', // Foreground for cards (soft off-white)

			'--border': '#000000', // Dark purple-gray border
			'--input': '285 25% 13%', // Same as muted background for input fields

			'--primary': '320 40% 72%', // Primary color (soft pink) from Rosepine palette (#eb6f92)
			'--primary-foreground': '285 15% 85%', // Soft off-white for primary foreground

			'--secondary': '250 30% 75%', // Secondary color (light blue) from Rosepine palette (#9ccfd8)
			'--secondary-foreground': '285 15% 85%', // Soft off-white for secondary foreground

			'--accent': '0 70% 58%', // Accent color (reddish) from Rosepine (#ebbcba)
			'--accent-foreground': '285 15% 85%', // Soft off-white for accent foreground

			'--destructive': '0 70% 60%', // Destructive color (soft red) (#eb6f92)
			'--destructive-foreground': '285 15% 85%', // Soft foreground for destructive elements

			'--ring': '250 30% 75%', // Light blue ring for focused elements (#9ccfd8)

			'--radius': '0.5rem' // Keep border radius unchanged
		},
		rosepine_light: {
			'--background': '#faf4ed', // Light background (warm off-white)
			'--foreground': '#575279', // Darker purple for text

			'--muted': '30 12% 94%', // Muted tone (light warm beige) equivalent to #f2e9e1
			'--muted-foreground': '285 15% 30%', // Darker muted foreground (purple-gray)

			'--popover': '30 12% 94%', // Popover background, same as muted (#f2e9e1)
			'--popover-foreground': '285 15% 30%', // Darker foreground for popovers (purple-gray)

			'--card': '30 12% 94%', // Card background, same as muted (#f2e9e1)
			'--card-foreground': '285 15% 30%', // Darker foreground for cards (purple-gray)

			'--border': '#000000', // Lighter grayish-purple border
			'--input': '30 12% 94%', // Same as muted background for input fields

			'--primary': '320 45% 50%', // Softer pink for primary color (#b4637a)
			'--primary-foreground': '30 10% 95%', // Light off-white for primary foreground

			'--secondary': '250 45% 55%', // Soft blue for secondary color (#56949f)
			'--secondary-foreground': '30 10% 95%', // Light off-white for secondary foreground

			'--accent': '0 60% 65%', // Accent color (reddish) from Rosepine (#d7827e)
			'--accent-foreground': '30 10% 95%', // Light off-white for accent foreground

			'--destructive': '0 60% 65%', // Destructive color (soft red) (#d7827e)
			'--destructive-foreground': '30 10% 95%', // Light foreground for destructive elements

			'--ring': '250 45% 55%', // Soft blue ring color for focused elements (#56949f)

			'--radius': '0.5rem' // Keep border radius unchanged
		},
		pink_light: {
			'--background': '#eeeeee', // White background
			'--foreground': '#d15466', // Light pink foreground

			'--muted': '330 50% 90%', // Light pink muted
			'--muted-foreground': '330 30% 50%', // Darker muted pink

			'--popover': '0 0% 93%', // Slightly darker pink for popovers
			'--popover-foreground': '351 58% 57%', // Black text on popover

			'--card': '330 50% 85%', // Card background
			'--card-foreground': '#000000', // Black text on card

			'--border': '#cccccc', // Light gray border
			'--input': '330 50% 90%', // Input background

			'--primary': '300 40% 50%', // Pastel purple
			'--primary-foreground': '0 0% 100%', // White text on primary

			'--secondary': '210 70% 60%', // Pastel blue
			'--secondary-foreground': '#ffffff', // White text on secondary

			'--accent': '60 70% 80%', // Pastel yellow
			'--accent-foreground': '#000000', // Black text on accent

			'--destructive': '0 70% 50%', // Pastel red
			'--destructive-foreground': '#ffffff', // White text on destructive

			'--ring': '60 70% 70%', // Pastel yellow ring

			'--radius': '0.5rem' // Border radius
		},
		pink_dark: {
			'--background': '#5e1a40', // Dark background
			'--foreground': '#ffb6c1', // Light pink foreground

			'--muted': '330 50% 30%', // Muted dark pink
			'--muted-foreground': '330 30% 60%', // Lighter muted pink

			'--popover': '327 56% 24%', // Popover dark pink
			'--popover-foreground': '#ffffff', // White text on popover

			'--card': '330 50% 35%', // Card dark background
			'--card-foreground': '#ffffff', // White text on card

			'--border': '#333333', // Dark gray border
			'--input': '330 50% 30%', // Input dark background

			'--primary': '326 72% 89%', // Pastel yellow
			'--primary-foreground': '327 56% 24%', // Dark text on accent

			'--secondary': '210 70% 60%', // Pastel blue
			'--secondary-foreground': '#1c1c1c', // Dark text on secondary

			'--accent': '326 57% 28%', // Pastel yellow
			'--accent-foreground': '326 72% 89%', // Dark text on accent

			'--destructive': '0 70% 50%', // Pastel red
			'--destructive-foreground': '#ffffff', // White text on destructive

			'--ring': '60 70% 60%', // Pastel yellow ring

			'--radius': '0.5rem' // Border radius
		},
		babyblue_light: {
			'--background': '#e0f7fa', // Baby blue background
			'--foreground': '#006064', // Dark teal foreground

			'--muted': '190 30% 90%', // Light baby blue muted
			'--muted-foreground': '190 20% 50%', // Darker muted blue

			'--popover': '190 30% 80%', // Slightly darker blue for popovers
			'--popover-foreground': '#000000', // Black text on popover

			'--card': '190 30% 85%', // Card background
			'--card-foreground': '#000000', // Black text on card

			'--border': '#b2ebf2', // Light blue border
			'--input': '190 30% 90%', // Input background

			'--primary': '220 70% 50%', // Pastel navy
			'--primary-foreground': '#ffffff', // White text on primary

			'--secondary': '160 70% 60%', // Pastel green
			'--secondary-foreground': '#ffffff', // White text on secondary

			'--accent': '50 70% 80%', // Pastel yellow
			'--accent-foreground': '#000000', // Black text on accent

			'--destructive': '0 70% 50%', // Pastel red
			'--destructive-foreground': '#ffffff', // White text on destructive

			'--ring': '50 70% 70%', // Pastel yellow ring

			'--radius': '0.5rem' // Border radius
		},
		babyblue_dark: {
			'--background': '#004d40', // Dark teal background
			'--foreground': '#80deea', // Light baby blue foreground

			'--muted': '190 30% 30%', // Muted dark blue
			'--muted-foreground': '190 20% 60%', // Lighter muted blue

			'--popover': '190 30% 40%', // Popover dark blue
			'--popover-foreground': '#ffffff', // White text on popover

			'--card': '190 30% 35%', // Card dark background
			'--card-foreground': '#ffffff', // White text on card

			'--border': '#004d40', // Dark teal border
			'--input': '190 30% 30%', // Input dark background

			'--primary': '220 70% 60%', // Pastel navy
			'--primary-foreground': '#004d40', // Dark text on primary

			'--secondary': '160 70% 60%', // Pastel green
			'--secondary-foreground': '#004d40', // Dark text on secondary

			'--accent': '50 70% 70%', // Pastel yellow
			'--accent-foreground': '#004d40', // Dark text on accent

			'--destructive': '0 70% 50%', // Pastel red
			'--destructive-foreground': '#ffffff', // White text on destructive

			'--ring': '50 70% 60%', // Pastel yellow ring

			'--radius': '0.5rem' // Border radius
		},
		cyberpunk_light: {
			'--background': '#cc0000', // Black background
			'--foreground': '#000000', // Bright red foreground

			'--muted': '0 100% 20%', // Dark red muted
			'--muted-foreground': '0 0% 0%', // Light red muted

			'--popover': '0 100% 40%', // Darker red for popovers
			'--popover-foreground': '#ffffff', // White text on popover

			'--card': '0 100% 25%', // Card dark red background
			'--card-foreground': '#ffffff', // White text on card

			'--border': '0 0% 0%', // Dark gray border
			'--input': '0 100% 20%', // Input dark red background

			'--primary': '0 0% 0%', // Orange-red
			'--primary-foreground': '0 100% 60%', // Black text on primary

			'--secondary': '#dc143c', // Crimson
			'--secondary-foreground': '#000000', // Black text on secondary

			'--accent': '16 100% 50%', // Deep pink
			'--accent-foreground': '#000000', // Black text on accent

			'--destructive': '#b22222', // Firebrick
			'--destructive-foreground': '#ffffff', // White text on destructive

			'--ring': '#ff0000', // Bright red ring

			'--radius': '0.5rem' // Border radius
		},
		cyberpunk_dark: {
			'--background': '#000000', // Very dark gray background
			'--foreground': '#cc0000', // Lighter bright red foreground

			'--muted': '0 100% 15%', // Very dark red muted
			'--muted-foreground': '0 100% 55%', // Light red muted

			'--popover': '0 0% 0%', // Darker red for popovers
			'--popover-foreground': '#ffffff', // White text on popover

			'--card': '0 100% 20%', // Card very dark red background
			'--card-foreground': '#ffffff', // White text on card

			'--border': '#4d4d4d', // Medium dark gray border
			'--input': '0 100% 15%', // Input very dark red background

			'--primary': '0 100% 50%', // Tomato
			'--primary-foreground': '0 0% 0%', // Dark text on primary

			'--secondary': '#e75480', // Hot pink
			'--secondary-foreground': '#1a1a1a', // Dark text on secondary

			'--accent': '0 90% 30%', // Hot pink
			'--accent-foreground': '0 0% 0%', // Dark text on accent

			'--destructive': '#cd5c5c', // Indian red
			'--destructive-foreground': '#ffffff', // White text on destructive

			'--ring': '#ff4d4d', // Bright red ring

			'--radius': '0.5rem' // Border radius
		}
	};

	const themeProperties = properties[mode];
	for (const property in themeProperties) {
		r.style.setProperty(property, themeProperties[property]);
	}
}

