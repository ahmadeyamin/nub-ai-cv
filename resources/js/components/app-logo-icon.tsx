import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} width="256" height="256" viewBox="0 0 256 256" fill="none"
            xmlns="http://www.w3.org/2000/svg">

            <circle cx="128" cy="128" r="120" fill="#0F172A" />

            <rect x="78" y="58" width="100" height="140" rx="10" fill="#FFFFFF" />
            <rect x="92" y="82" width="72" height="8" rx="4" fill="#CBD5E1" />
            <rect x="92" y="100" width="60" height="8" rx="4" fill="#CBD5E1" />
            <rect x="92" y="118" width="68" height="8" rx="4" fill="#CBD5E1" />

            <circle cx="86" cy="150" r="6" fill="#3B82F6" />
            <circle cx="128" cy="164" r="6" fill="#3B82F6" />
            <circle cx="170" cy="148" r="6" fill="#3B82F6" />

            <line x1="86" y1="150" x2="128" y2="164" stroke="#3B82F6" stroke-width="3" />
            <line x1="128" y1="164" x2="170" y2="148" stroke="#3B82F6" stroke-width="3" />

            <circle cx="164" cy="78" r="18" fill="#22C55E" />
            <path d="M156 78 L162 84 L172 72"
                stroke="#FFFFFF" stroke-width="3"
                stroke-linecap="round" stroke-linejoin="round" />

        </svg>

    );
}
