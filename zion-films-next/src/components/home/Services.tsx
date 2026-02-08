"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight, Video, Scissors, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Captação e Filmagem",
        description: "Gravação em 4K com equipamentos de ponta para garantir máxima qualidade visual e impacto cinematográfico.",
        icon: Video,
        color: "from-cyan-500 to-blue-500",
        delay: 0.1,
    },
    {
        title: "Edição e Pós-Produção",
        description: "Montagem narrativa, ritmo, storytelling e finalização profissional para vídeos que prendem atenção.",
        icon: Scissors,
        color: "from-amber-400 to-orange-500", // Zion Gold
        delay: 0.2,
    },
    {
        title: "Soluções Audiovisuais",
        description: "Vídeo Institucional • Aftermovie • Eventos • Publicidade • Reels • Divulgação • Aniversários • Casamentos",
        icon: Zap,
        color: "from-violet-500 to-purple-500",
        delay: 0.3,
    },
];

export function Services() {
    return (
        <section id="servicos" className="py-20 md:py-32 bg-zion-secondary relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-zion-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20 px-4"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 h2-gradient font-outfit">
                        Nossos Serviços
                    </h2>
                    <p className="font-inter text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                        Soluções completas em vídeo, da concepção à entrega final, com qualidade cinematográfica.
                    </p>
                </motion.div>

                {/* MOBILE: Scroll Horizontal (Carousel)
                   DESKTOP: Grid
                   Alterações: 
                   1. 'items-stretch' para garantir altura igual
                   2. 'snap-center' para centralizar o card no mobile ao parar o scroll
                */}
                <div className="
                    flex md:grid md:grid-cols-3 
                    gap-4 md:gap-8 
                    overflow-x-auto md:overflow-visible
                    pb-12 md:pb-0 
                    snap-x snap-mandatory 
                    scrollbar-hide 
                    -mx-6 px-6 md:mx-0 md:px-0 
                    items-stretch
                ">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="
                                w-[85vw] md:w-auto md:min-w-0 flex-shrink-0 
                                group relative 
                                bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl 
                                p-6 md:p-8 
                                overflow-hidden 
                                hover:-translate-y-2 transition-all duration-500 hover:border-white/10 hover:shadow-glass 
                                snap-center
                                flex flex-col justify-between
                            "
                        >
                            {/* Conteúdo do Card */}
                            <div>
                                {/* Background Gradient Effect */}
                                <div
                                    className={cn(
                                        "absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br opacity-5 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-20",
                                        service.color
                                    )}
                                />

                                {/* Icon */}
                                <div className="mb-6 md:mb-8 relative inline-block">
                                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 blur-xl rounded-full transition-all duration-500 group-hover:opacity-40 group-hover:scale-125", service.color)} />
                                    <service.icon className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 drop-shadow-lg" />
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-outfit tracking-wide">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed font-inter font-light text-sm md:text-base">
                                    {service.description}
                                </p>
                            </div>

                            {/* Link fixado no final */}
                            <Link
                                href="#portfolio"
                                className="inline-flex items-center text-zion-gold font-semibold uppercase tracking-wider text-xs hover:text-white transition-colors gap-2 group/btn mt-auto"
                            >
                                Ver portfólio
                                <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Indicadores de Swipe (Apenas visual para mobile) */}
                <div className="flex justify-center -mt-6 gap-2 md:hidden">
                    {services.map((_, i) => (
                        <div key={i} className={cn(
                            "w-2 h-2 rounded-full transition-colors duration-300",
                            i === 0 ? "bg-zion-gold" : "bg-white/20" // Destaca o primeiro apenas como exemplo visual
                        )} />
                    ))}
                </div>
            </div>
        </section>
    );
}