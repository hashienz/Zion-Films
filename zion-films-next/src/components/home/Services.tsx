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
        <section id="servicos" className="py-32 bg-zion-secondary relative overflow-hidden">
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
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 h2-gradient font-outfit">
                        Nossos Serviços
                    </h2>
                    <p className="font-inter text-gray-400 max-w-2xl mx-auto text-lg">
                        Soluções completas em vídeo, da concepção à entrega final, com qualidade cinematográfica.
                    </p>
                </motion.div>

                {/* Mobile: Horizontal Scroll (Carousel) | Desktop: Grid */}
                <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="min-w-[300px] md:min-w-0 flex-shrink-0 group relative bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-white/10 hover:shadow-glass snap-center"
                        >
                            {/* Background Gradient Effect */}
                            <div
                                className={cn(
                                    "absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br opacity-5 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-20",
                                    service.color
                                )}
                            />

                            {/* Icon */}
                            <div className="mb-8 relative inline-block">
                                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 blur-xl rounded-full transition-all duration-500 group-hover:opacity-40 group-hover:scale-125", service.color)} />
                                <service.icon className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 font-outfit tracking-wide">{service.title}</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed font-inter font-light">
                                {service.description}
                            </p>

                            <Link
                                href="#portfolio"
                                className="inline-flex items-center text-zion-gold font-semibold uppercase tracking-wider text-xs hover:text-white transition-colors gap-2 group/btn"
                            >
                                Ver portfólio
                                <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Swipe Indicator */}
                <div className="flex justify-center mt-4 gap-1 md:hidden">
                    {services.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    ))}
                </div>
            </div>
        </section>
    );
}
