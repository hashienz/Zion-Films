"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const faqs = [
    {
        question: "Qual o prazo de entrega de um vídeo?",
        answer: "O prazo varia com a complexidade, mas um vídeo para redes sociais geralmente leva de 2 a 15 dias úteis após a gravação.",
    },
    {
        question: "Quanto custa os serviços?",
        answer: "Cada projeto possui necessidades diferentes. Entre em contato e consulte o preço com o filmmaker.",
    },
    {
        question: "Como funciona o pagamento?",
        answer: "O pagamento funciona da seguinte forma: 50% no momento do agendamento e os 50% restantes devem estar quitados até o dia da gravação.",
    },
];

export function Contact() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section id="contato" className="py-20 bg-zion-secondary">
            <div className="container-custom">
                <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 h2-gradient">
                    Vamos Conversar?
                </h2>
                <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                    Seja para um orçamento, uma ideia ou um simples olá, estou aqui para ajudar.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    {/* Contact Direct */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Fale Comigo</h3>

                        <a
                            href="https://wa.me/554185066974?text=Ol%C3%A1%20ZionFilms%21%20Vi%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20um%20or%C3%A7amento."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-4 bg-[#25D366] text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-[#128C7E] transition-all hover:scale-105 shadow-lg group"
                        >
                            <MessageCircle className="w-6 h-6 fill-current" />
                            Orçamento WhatsApp
                        </a>

                        <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-white/10">
                            <a href="mailto:zionfilms.audiovisual@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-zion-gold transition-colors">
                                <Mail className="w-5 h-5" />
                                zionfilms.audiovisual@gmail.com
                            </a>
                            <p className="text-sm text-gray-500">ou preencha o formulário ao lado</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        action="https://formspree.io/f/xzzgknrp"
                        method="POST"
                        className="space-y-4 bg-white/5 p-8 rounded-2xl border border-white/5"
                    >
                        <div>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zion-gold focus:ring-1 focus:ring-zion-gold transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Seu e-mail"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zion-gold focus:ring-1 focus:ring-zion-gold transition-all"
                            />
                        </div>
                        <div>
                            <textarea
                                name="mensagem"
                                placeholder="Sua mensagem"
                                required
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zion-gold focus:ring-1 focus:ring-zion-gold transition-all resize-none"
                            />
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                            Enviar Mensagem
                        </Button>
                    </form>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-white text-center mb-8">Perguntas Frequentes</h3>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-200 hover:bg-white/5 transition-colors"
                                >
                                    {faq.question}
                                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-zion-gold" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaq === index ? "auto" : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-4 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
