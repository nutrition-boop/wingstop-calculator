'use client';

import { Share2, MessageSquare, ThumbsUp, Link as LinkIcon, Mail, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SocialShareProps {
    title: string;
    url: string;
    description?: string;
    imageUrl?: string;
    className?: string;
}

export default function SocialShare({
    title,
    url,
    description = '',
    imageUrl = '',
    className = '',
}: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {
        setFullUrl(`${window.location.origin}${url}`);
    }, [url]);

    const activeUrl = fullUrl || `https://wingstopcalcs.com${url}`;
    const shareText = `Check out ${title} nutrition facts: ${activeUrl}`;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activeUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${activeUrl}`)}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(activeUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url: activeUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-dark flex items-center space-x-2">
                    <Share2 size={20} className="text-primary" />
                    <span>Share Nutrition Facts</span>
                </h3>

                {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                        onClick={handleNativeShare}
                        className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center space-x-2"
                    >
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-colors group"
                    aria-label="Share on Twitter"
                >
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                        <MessageSquare size={20} />
                    </div>
                    <span className="text-sm font-bold text-blue-700">Twitter</span>
                </a>

                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-2xl border border-indigo-100 hover:bg-indigo-100 transition-colors group"
                    aria-label="Share on Facebook"
                >
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                        <ThumbsUp size={20} />
                    </div>
                    <span className="text-sm font-bold text-indigo-700">Facebook</span>
                </a>

                <a
                    href={shareLinks.email}
                    className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors group"
                    aria-label="Share via Email"
                >
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                    </div>
                    <span className="text-sm font-bold text-emerald-700">Email</span>
                </a>

                <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                    aria-label="Copy link to clipboard"
                >
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-600 mb-3 group-hover:scale-110 transition-transform">
                        {copied ? <Copy size={20} /> : <LinkIcon size={20} />}
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                        {copied ? 'Copied!' : 'Copy Link'}
                    </span>
                </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex-1 truncate">
                        <p className="text-sm font-medium text-slate-700 truncate">{fullUrl}</p>
                    </div>
                    <button
                        onClick={handleCopyLink}
                        className="ml-4 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-2 flex-shrink-0"
                    >
                        {copied ? (
                            <>
                                <Copy size={14} />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <LinkIcon size={14} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <p className="text-sm text-slate-500 mt-4">
                Share these nutrition facts with friends or save for your meal planning.
            </p>
        </div>
    );
}