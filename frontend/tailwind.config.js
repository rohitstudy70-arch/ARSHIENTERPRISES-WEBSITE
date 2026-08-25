const tailwindConfig = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0369a1', // Tailwind sky-700 (Passes WCAG AA 4.5:1 contrast)
                secondary: '#075985', // Tailwind sky-800
                accent: '#0284c7', // Tailwind sky-600
                dark: '#0f172a', // Tailwind slate-900
                darker: '#020617', // Tailwind slate-950
                light: '#f8fafc', // Tailwind slate-50
                border: '#e2e8f0', // Tailwind slate-200
                // Admin dark theme
                slate: {
                    ...require('tailwindcss/colors').slate,
                    850: '#172033',
                    950: '#020617',
                },
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out',
                slideIn: 'slideIn 0.5s ease-in-out',
                float: 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
};

export default tailwindConfig;
