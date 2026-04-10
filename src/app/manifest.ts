import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Wingstop Nutrition Calculator',
        short_name: 'Wingstop Calcs',
        description: 'Track calories, macros, allergens & diet goals for every Wingstop menu item',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#006938',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}