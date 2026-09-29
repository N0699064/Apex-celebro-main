/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        sans: ['Manrope', 'system-ui', 'sans-serif'],
                        display: ['Manrope', 'system-ui', 'sans-serif'],
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        ink: {
                                DEFAULT: '#021048',
                                900: '#010A30',
                                800: '#06185C',
                                700: '#102470',
                                600: '#1E3285',
                        },
                        brand: {
                                DEFAULT: '#0000FF',
                                50: '#EEEEFF',
                                100: '#DCDCFF',
                                200: '#B3B3FF',
                                300: '#8080FF',
                                400: '#4D4DFF',
                                500: '#2626FF',
                                600: '#0000FF',
                                700: '#0000D6',
                                800: '#0000A8',
                        },
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                },
                keyframes: {
                        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                        'fade-up': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                        'float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
                        'flash': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-up': 'fade-up 0.6s ease-out both',
                        'fade-in': 'fade-in 0.8s ease-out both',
                        'float': 'float 7s ease-in-out infinite',
                        'flash': 'flash 0.55s ease-in-out infinite',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
