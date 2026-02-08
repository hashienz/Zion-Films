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
        <section id="servicos" className="py-20 bg-zion-secondary relative overflow-hidden">
            <div className="container-custom relative z-10">
                <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 h2-gradient">
                    Meus Serviços
                </h2>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
                    Soluções completas em vídeo, da concepção à entrega final.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay, duration: 0.6 }}
                            className="group relative bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-8 overflow-hidden hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Background Gradient Effect */}
                            <div
                                className={cn(
                                    "absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br opacity-10 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-20",
                                    service.color
                                )}
                            />

                            {/* Icon */}
                            <div className="mb-6 relative">
                                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 blur-xl rounded-full", service.color)} />
                                <service.icon className="w-12 h-12 text-white relative z-10" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <Link
                                href="#portfolio"
                                className="inline-flex items-center text-zion-gold font-semibold uppercase tracking-wider text-sm hover:text-white transition-colors gap-2 group/btn"
                            >
                                Ver exemplos
                                <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
