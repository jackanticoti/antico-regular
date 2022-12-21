const tiConfig = require('./ti-config.json');

const INSTANCE_NAME = process.env.INSTANCE;
let instanceSettings = {};

function getInstanceSetting(settingName, defaultSetting) {
  if (!Object.keys(instanceSettings).length) {
    const { instances = [] } = tiConfig;
    let instance = instances[0];

    if (INSTANCE_NAME) {
      const possibleMatch = instances.find(instance => instance.nickname === INSTANCE_NAME);
      if (possibleMatch && possibleMatch.apiKey) {
        instance = possibleMatch;
      }
    }

    instanceSettings = instance;
  }

  return instanceSettings[settingName] || defaultSetting;
}

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './dist/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1920px',
      '3xl': '2560px'
    },
    fontSize: {
      sm: ["clamp(0.63rem, calc(0.38rem + 1.22vw), 1.25rem)", "1.4"],
      base: ["clamp(0.70rem, calc(0.37rem + 1.68vw), 1.56rem)", "1.5"],
      lg: ["clamp(0.79rem, calc(0.34rem + 2.27vw), 1.95rem)", "1.4"],
      xl: ["clamp(0.89rem, calc(0.28rem + 3.03vw), 2.44rem)", "1.4"],
      "2xl": ["clamp(1.00rem, calc(0.20rem + 4.00vw), 3.05rem)", "1.2"],
      "3xl": ["clamp(1.13rem, calc(0.08rem + 5.25vw), 3.82rem)", "1.1"],
      "4xl": ["clamp(1.27rem, calc(-0.10rem + 6.83vw), 4.77rem)", "1"],
      "5xl": ["clamp(1.43rem, calc(-0.34rem + 8.85vw), 5.96rem)", "1"],
      "6xl": ["clamp(1.60rem, calc(-0.68rem + 11.41vw), 7.45rem)", "1"],
      "7xl": ["clamp(1.80rem, calc(-1.13rem + 14.65vw), 9.31rem)", "1"],
    },
    extend: {
      colors: {
        brandPrimary: {
          50: "#F4F3FE", // becomes primary-900 in dark mode
          300: "#B7B0FC", // becomes primary-600 in dark mode
          600: "#6451DF", // becomes primary-300 in dark mode
          900: "#3B1FA3", // becomes primary-50 in dark mode
        },
        brandTertiary: "#508ef0",
        brandQuaternary:"#BEF9C0",
        interface: {
          100: "#d1d5db",
          200: "#6b7280",
          300: "#1f2937",
        },
        textPrimary: {
          100: "#d1d5db",
          200: "#6b7280",
          300: "#1f2937",
        },
        border: {
          100: "#e5e7eb",
          200: "#d1d5db",
          300: "#9ca3af",
        },
        disabled: {
          100: "#e4e4e7",
          300: "#a1a1aa",
        },
        surface: {
          100: "#ffffff",
          200: "#fafafa",
          300: "#f5f5f7",
        },
        bgDefault: {
          100: "#f3f4f6",
          800: "#3f3f46"
        },
        accent: getInstanceSetting('accentColor', '#111111'),
        secondary: getInstanceSetting('secondaryColor', '#111111'),
        link: getInstanceSetting('linkColor', '#a9a9a9'),
        'accent-highlight': '#111111',
        'accent-highlight-background': '#dddddd',
        'accent-tinted': {
          70: '#b8b8b8',
          80: '#cfcfcf',
          90: '#e7e7e7'
        },
        'accent-contrast': '#ffffff',
        'accent-contrast-tinted-background': '#b3b3b3',
        'accent-hover': '#2b2b2b',
        'secondary-hover': '#2b2b2b',
        'secondary-contrast': '#ffffff',
        'link-hover': '#767676'
      },
      fontFamily: {
        primary: [getInstanceSetting('font', 'Inter'), 'Nunito', 'sans-serif'],
        header: [getInstanceSetting('font', 'Roboto Condensed'), 'Nunito', 'sans-serif'],
        secondary: [getInstanceSetting('altFont', 'Roboto Condensed'), 'sans-serif'],
        robotocondensed: [getInstanceSetting('font', 'Roboto Condensed'), 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
