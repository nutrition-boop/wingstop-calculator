// src/components/Breadcrumb.tsx

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
    label: string;
    href: string;
    active?: boolean;
};

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
    showHome?: boolean;
}

export default function Breadcrumb({
    items,
    className = '',
    showHome = true
}: BreadcrumbProps) {
    const allItems = showHome
        ? [{ label: 'HOME', href: '/', active: false }, ...items]
        : items;

    return (
        <nav
            className={`flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] font-black uppercase tracking-[0.25em] ${className}`}
            aria-label="Breadcrumb"
        >
            {allItems.map((item, index) => {
                const isLast = index === allItems.length - 1 || item.active;

                return (
                    <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                        {isLast ? (
                            <span
                                className="text-[#006938] leading-tight truncate max-w-[250px]"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-slate-400 leading-tight hover:text-[#006938] transition-colors truncate max-w-[200px]"
                            >
                                {item.label}
                            </Link>
                        )}
                        {!isLast && (
                            <ChevronRight size={10} className="text-slate-300 flex-shrink-0" strokeWidth={3} />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}