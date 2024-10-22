import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.wisp-r.app',
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
  //server: {
  //  //"url": "http://172.18.0.1:5173/",
  //  "url": "http://172.16.100.146:5173/",
  //  "cleartext": true
  //}
};

export default config;
