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
        'gradient-main': 'linear-gradient(55deg, #A91DC8 0%, #0B2360 8%, #00052E 80%, #01DFEC 100%, #00052E 100%)',
        'gradient-full': 'linear-gradient(135deg, #0B2360, #01DFEC, #EA36E1)',
        'sportigio-gradient': 'linear-gradient(55deg, #A91DC8 0%, #0B2360 8%, #00052E 80%, #01DFEC 100%, #00052E 100%)',
        'sportigio-gradient-2': 'linear-gradient(55deg, #A91DC8 0%, #0B2360 20%, #00052E 66%, #01DFEC 100%, #00052E 100%)',
        'sportigio-gradient-3': 'linear-gradient(120deg, #0B2360 10%, #00052E 70%, #01DFEC 100%)',
        'sportigio-gradient-4': 'linear-gradient(135deg, #A91DC8 0%, #0B2360 60%, #00052E 100%)',
        'sportigio-gradient-5': 'linear-gradient(135deg, #0B2360 0%, #00052E 100%)',
      },
    },
  },
  plugins: [],
} 