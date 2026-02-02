
"use client";

import React from 'react';
import {
    Globe,
    Share2,
    MessageCircle,
    Link as LinkIcon,
    Send,
    Feather,
    Triangle
} from 'lucide-react';

const links = [
    { title: 'Experiments', href: 'https://kodlabjunior.com/' },
    { title: 'Services', href: 'https://kodlabjunior.com/' },
    { title: 'Archive', href: 'https://kodlabjunior.com/' },
    { title: 'Laboratory', href: 'https://kodlabjunior.com/' },
    { title: 'Contact', href: 'https://kodlabjunior.com/' },
    { title: 'About', href: 'https://kodlabjunior.com/' },
];

const socials = [
    { icon: Share2, label: 'Share', href: 'https://kodlabjunior.com/' },
    { icon: MessageCircle, label: 'Chat', href: 'https://kodlabjunior.com/' },
    { icon: LinkIcon, label: 'Connect', href: 'https://kodlabjunior.com/' },
    { icon: Globe, label: 'Web', href: 'https://kodlabjunior.com/' },
    { icon: Send, label: 'Telegram', href: 'https://kodlabjunior.com/' },
    { icon: Feather, label: 'Feed', href: 'https://kodlabjunior.com/' },
];

export default function FooterSection() {
    return (
        <footer className="relative z-10 py-16 md:py-32 bg-black/40 backdrop-blur-md border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center">
                    <a href="https://kodlabjunior.com/" aria-label="go home" className="flex items-center gap-3 mb-12 opacity-80 hover:opacity-100 transition-opacity group">
                        <Triangle className="size-6 fill-white group-hover:rotate-180 transition-transform duration-700" />
                        <span className="font-black tracking-tighter text-2xl uppercase italic">UncleLabs</span>
                    </a>

                    <div className="mb-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] uppercase tracking-[0.3em] font-bold">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-white/40 hover:text-white transition-colors duration-200">
                                <span>{link.title}</span>
                            </a>
                        ))}
                    </div>

                    <div className="mb-16 flex flex-wrap justify-center gap-8">
                        {socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="text-white/20 hover:text-white transition-all duration-300 hover:scale-125">
                                <social.icon className="size-5" />
                            </a>
                        ))}
                    </div>

                    <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-black">
                             © {new Date().getFullYear()} UncleLabs Studio. Built for the future.
                        </span>
                        <div className="flex gap-6">
                             <a href="https://kodlabjunior.com/" className="text-white/20 text-[9px] uppercase tracking-widest italic hover:text-white transition-colors">Digital Research & Dev</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
