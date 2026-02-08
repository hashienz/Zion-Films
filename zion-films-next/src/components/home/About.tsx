"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ClipboardList, Clapperboard, Sparkles, Rocket } from "lucide-react";

const processSteps = [
    {
        icon: ClipboardList,
        title: "1. Planejamento",
        description: "Tudo começa com uma boa conversa para alinhar ideias, objetivos e referências.",
        delay: 0.1,
    },
    {
        icon: Clapperboard,
        title: "2. Produção",
        description: "É o dia de dar vida ao roteiro, com foco total na captação de imagens e sons incríveis.",
        delay: 0.2,
    },
    {
        icon: Sparkles,
        title: "3. Pós-produção",
        description: "A mágica acontece na edição, onde o material bruto se transforma em uma história coesa.",
        delay: 0.3,
    },
    {
        icon: Rocket,
        title: "4. Entrega",
        description: "Você recebe seu vídeo finalizado, pronto para encantar seu público.",
        delay: 0.4,
    },
];

export function About() {
    return (
        <section id="sobre" className="py-20 bg-zion-dark">
            <div className="container-custom">
                <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 h2-gradient">
                    Somos a ZionFilms
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 items-center mb-24">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="absolute -top-4 -left-4 w-full h-full border border-zion-gold z-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
                        <div className="relative z-10 rounded-lg overflow-hidden shadow-premium aspect-[4/5] bg-gray-800">
                            <Image
                                src="/img/logoFundoPreto.PNG"
                                alt="ZionFilms Logo"
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Contando Histórias que Conectam
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            ZionFilms é mais do que uma produtora audiovisual, é um olhar sensível sobre cada história. Acreditamos que cada cena carrega emoção, propósito e verdade. Por isso, transformamos momentos simples em memórias inesquecíveis e ideias em experiências visuais que conectam pessoas. Nosso foco é contar histórias com autenticidade, criatividade e excelência, valorizando cada detalhe e cada cliente como parte da nossa jornada.
                        </p>
                        <Button variant="outline" size="lg" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}>
                            Vamos criar juntos?
                        </Button>
                    </motion.div>
                </div>

                {/* Process */}
                <div className="mt-20 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[140px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zion-gold/30 to-transparent z-0" />

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl text-center text-white font-semibold mb-12"
                    >
                        Nosso Processo de Trabalho
                    </motion.h3>

                    {/* Mobile: Horizontal Scroll (Carousel) | Desktop: Grid */}
                    <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto pb-8 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="min-w-[280px] bg-white/5 border border-white/5 p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 border-transparent hover:border-zion-gold relative group snap-center"
                            >
                                {/* Step Number Background */}
                                <div className="absolute -top-6 -left-4 text-6xl font-bold font-outfit text-white/5 z-0 group-hover:text-zion-gold/10 transition-colors pointer-events-none">
                                    0{index + 1}
                                </div>

                                <div className="relative z-10 bg-zion-dark/50 rounded-full p-4 inline-block mb-6 border border-white/10 group-hover:border-zion-gold/50 transition-colors">
                                    <step.icon className="w-8 h-8 text-zion-gold drop-shadow-glow" />
                                </div>

                                <h4 className="relative z-10 text-xl font-bold text-white mb-3 font-outfit">{step.title.split('. ')[1]}</h4>
                                <p className="relative z-10 text-gray-400 text-sm font-inter leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    {/* Mobile Swipe Indicator */}
                    <div className="flex justify-center mt-4 gap-1 lg:hidden">
                        {processSteps.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
