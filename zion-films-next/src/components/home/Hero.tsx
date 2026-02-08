"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    return (
        <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] saturate-[1.2]"
                >
                    <source src="/vid/paranagua-1.mp4" type="video/mp4" />
                </video>
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-zion-dark/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 text-center max-w-4xl mx-auto mt-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
                >
                    Capturando emoções em movimento
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto mb-12"
                >
                    Produção de vídeos para clipes, eventos e comerciais.
                </motion.p>

                {/* Client Logos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="border-t border-white/20 pt-8"
                >
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">Trabalhos realizados para:</p>
                    <div className="flex justify-center items-center gap-12 flex-wrap">
                        <div className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert">
                            {/* Note: Invert filter used to make dark logos white, similar to original CSS */}
                            <Image src="/img/logo.png" alt="Servopa" fill className="object-contain" />
                        </div>
                        <div className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 invert">
                            <Image src="/img/chevrolet-valesul.avif" alt="Chevrolet" fill className="object-contain" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
