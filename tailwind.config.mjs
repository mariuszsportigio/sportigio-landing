/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B2360',
        secondary: '#01DFEC',
        accent: '#EA36E1',
        'navy-700': '#1E40AF',
        bonusBlue: '#00BAFF',
        gray100: '#F5F5F5',
        darkNavy: '#060E2C',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.2' }],
        'heading': ['36px', { lineHeight: '1.3' }],
        'large': ['24px', { lineHeight: '1.4' }],
        'body': ['18px', { lineHeight: '1.6' }],
        'small': ['14px', { lineHeight: '1.5' }],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      spacing: {
        'section': '80px',
        'card': '32px',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(1, 223, 236, 0.3)',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #0B2360 0%, #01DFEC 100%)',
        'gradient-full': 'linear-gradient(135deg, #0B2360, #01DFEC, #EA36E1)',
      },
    },
  },
  plugins: [],
} 