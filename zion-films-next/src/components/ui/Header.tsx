"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                setIsScrolled(true);
                if (currentScrollY > lastScrollY) {
                    setIsHidden(true);
                } else {
                    setIsHidden(false);
                }
            } else {
                setIsScrolled(false);
                setIsHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isScrolled ? "bg-zion-dark/90 backdrop-blur-md shadow-premium py-2" : "bg-transparent py-4",
                isHidden ? "-translate-y-full" : "translate-y-0"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                <Link href="/" className="relative z-50">
                    <Image
                        src="/img/LogoSemFundo.PNG"
                        alt="ZionFilms"
                        width={120}
                        height={60}
                        className="w-auto h-12 md:h-16 object-contain drop-shadow-glow transition-transform hover:scale-105"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium uppercase tracking-wider text-zion-text hover:text-zion-gold transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-zion-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-zion-dark flex flex-col items-center justify-center gap-8 z-40 md:hidden"
                        >
                            <nav className="flex flex-col items-center gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-2xl font-bold uppercase tracking-widest text-white hover:text-zion-gold transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-8 pt-8 border-t border-white/10 w-48 flex flex-col items-center gap-4">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zion-gold transition-colors">
                                    <Instagram size={24} />
                                </a>
                                <p className="text-xs text-white/50">© 2026 ZionFilms</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
