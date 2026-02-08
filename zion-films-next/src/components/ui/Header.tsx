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

            if (currentScrollY > 50) {
                setIsScrolled(true);
                if (currentScrollY > lastScrollY && currentScrollY > 500) {
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
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: isHidden ? -100 : 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-zion-dark/80 backdrop-blur-xl border-b border-white/5 shadow-premium py-3"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                <Link href="/" className="relative z-50 group">
                    <Image
                        src="/img/LogoSemFundo.PNG"
                        alt="ZionFilms"
                        width={140}
                        height={70}
                        className="w-auto h-10 md:h-14 object-contain drop-shadow-glow transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-outfit text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-zion-gold to-zion-gold-light transition-all duration-300 group-hover:w-full" />
                            <span className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-90 group-hover:scale-100" />
                        </Link>
                    ))}
                    <Link
                        href="#contato"
                        className="ml-4 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-outfit text-xs font-bold uppercase tracking-widest text-zion-gold transition-all hover:scale-105 hover:shadow-glow"
                    >
                        Orçamento
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50 relative p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 z-40 md:hidden"
                        >
                            <nav className="flex flex-col items-center gap-8">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="font-outfit text-3xl font-bold uppercase tracking-widest text-white hover:text-zion-gold transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 pt-8 border-t border-white/10 w-48 flex flex-col items-center gap-4"
                            >
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-zion-gold transition-colors">
                                    <Instagram size={24} />
                                </a>
                                <p className="font-inter text-xs text-white/30">© 2026 ZionFilms</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
