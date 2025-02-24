import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'lm-back': '#FFFFFF',
                'dm-back': '#131313',

                'lm-navbar-text': '#000000',
                'dm-navbar-text': '#FFFFFF',

                'lm-navbar-text-hl': '#575757',
                'dm-navbar-text-hl': '#D9D9D9',

                'lm-navbar-tctext': '#000000',
                'dm-navbar-tctext': '#FFFFFF',

                'lm-yellow': '#E7BA09',
                'dm-yellow': '#DAAE01',

                'lm-yellow-hl': '#CA9503',
                'dm-yellow-hl': '#CA9503',

                'lm-brown': '#301B02',
                'dm-lightyellow': '#FFF9E3',

                'lm-grey': '#D9D9D9',
                'dm-grey': '#1c1c1c',

                'lm-h1-text': '#000000',
                'dm-h1-text': '#FFFFFF',

                'lm-p-text': '#000000',
                'dm-p-text': '#FFFFFF',

                'highlight-yellow-lm': '#ffe770',
                'highlight-yellow-dm': '#7d6905',
            },
            fontFamily: {
                sans: [
                    'Lucida Sans',
                    'Lucida Sans Regular',
                    'Lucida Grande',
                    'Lucida Sans Unicode',
                    'Geneva',
                    'Verdana',
                    'sans-serif',
                ],

                // TODO: fallback fonts w/ web safe fonts
                // Cinzel: ['Cinzel'],

                // CinzelDecorative: ['Cinzel-Decorative'],

                PublicSans: ['Public-Sans'],

                Chocolate: ['Chocolate-Classical-Sans'],

                CommeReg: ['Comme-Reg'],
                CommeSemibold: ['Comme-Semibold'],

                Lato: ['Lato-Regular'],
            },

            fontSize: {
                //mavbar
                'nb-tc': ['1.75rem', '1.75rem'],
                'nb-tc-sm': ['1.5rem', '1.5rem'],
                'nb-val': ['1.2rem', '1.2rem'],

                xs: ['.75rem', '1rem'], //12px,16px
                sm: ['.875rem', '1.25rem'], //14px,20px
                base: ['1rem', '1.5rem'], //16px,24px
                lg: ['1.125rem', '1.75rem'], //20px,28px
                xl: ['1.25rem', '1.75rem'], //24px,28px
                '2xl': ['1.5rem', '2rem'], //24px,32px
                '3xl': ['1.875rem', '2.25rem'], //30px,36px
                '4xl': ['2.25rem', '2.5rem'], //36px,40px
                '5xl': ['3rem', '1'], //48px
                '6xl': ['3.75rem', '1'], //60px
                '7xl': ['4.5rem', '1'], //72px
                '8xl': ['6rem', '1'], //96px
                '9xl': ['12rem', '1'], //126px
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
export default config;
