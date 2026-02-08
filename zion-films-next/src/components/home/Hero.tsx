"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// teste de deploy

export function Hero() {
    return (
        <section id="inicio" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.3] contrast-[1.2] saturate-[1.1]"
                >
                    <source src="/vid/paranagua-1.mp4" type="video/mp4" />
                </video>
                {/* Vignette Overlay & Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-zion-dark/30 via-transparent to-zion-dark/90" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-zion-dark/40 to-zion-dark" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 text-center max-w-5xl mx-auto mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h2 className="font-outfit text-5xl md:text-8xl lg:text-9xl font-bold text-white mb-6 md:mb-8 tracking-tight leading-none drop-shadow-2xl">
                        Capturando <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zion-gold-light to-zion-gold">emoções</span> <br className="md:hidden" /> em movimento
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="font-inter text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-16 leading-relaxed"
                >
                    Produção audiovisual cinematográfica para clipes, eventos e comerciais que conta a sua história com excelência.
                </motion.p>

                {/* Client Logos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="border-t border-white/10 pt-10"
                >
                    <p className="font-outfit text-xs uppercase tracking-[0.3em] text-zion-gold mb-8 opacity-80">
                        Trusted Partners
                    </p>
                    <div className="flex justify-center items-center gap-12 md:gap-20 flex-wrap opacity-60 hover:opacity-100 transition-opacity duration-500">
                        <div className="relative w-32 h-14 md:w-40 md:h-16 grayscale hover:grayscale-0 transition-all duration-300 invert brightness-0 hover:invert-0 hover:brightness-100">
                            <Image src="/img/logo.png" alt="Servopa" fill className="object-contain" />
                        </div>
                        <div className="relative w-32 h-14 md:w-40 md:h-16 grayscale hover:grayscale-0 transition-all duration-300 invert brightness-0 hover:invert-0 hover:brightness-100">
                            <Image src="/img/chevrolet-valesul.avif" alt="Chevrolet" fill className="object-contain" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-zion-gold to-transparent opacity-50" />
            </motion.div>
        </section>
    );
}
