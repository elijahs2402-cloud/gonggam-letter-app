import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.gonggamletter.app",
  appName: "공감편지",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f5efe3",
      showSpinner: false,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#f5efe3",
    },
  },
};

export default config;
