import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
	appId: 'com.wispr.app',
	appName: 'wisp_r',
	webDir: 'build',
	plugins: {
		Keyboard: {
			resize: KeyboardResize.None,
			style: KeyboardStyle.Dark
		},
		SafeArea: {
			enabled: true,
			customColorsForSystemBars: true,
			statusBarColor: '#000000',
			statusBarContent: 'dark',
			navigationBarColor: '#000000',
			navigationBarContent: 'dark',
			offset: 0,
		},
	},
	server: {
		//	// for android only, below settings will work out of the box
		//	// for iOS or both, change the url to http://your-device-ip
		//	// To discover your workstation IP, just run ifconfig
		//	//"url": "http://192.168.1.248:5174",
		//	//"url": "http://192.168.1.235:5173",
		//	"url": "http://192.168.178.91:5173",
		//	//"url": "http://10.0.209.245:5173",
		//	//"url": "http://10.0.113.110:5173",
		"url": "http://192.168.100.200:5173",
		"cleartext": true
	}
};

export default config;
