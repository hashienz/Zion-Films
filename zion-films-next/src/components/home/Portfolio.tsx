"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Project {
    _id: string;
    title: string;
    category: string;
    videoUrl: string;
    coverImage: any;
}

export function Portfolio() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const query = `*[_type == "project"] | order(_createdAt desc)`;
                const data = await client.fetch(query);
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (carousel.current) {
            // Recalculate width when projects change
            setTimeout(() => {
                if (carousel.current) {
                    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
                }
            }, 500);
        }
    }, [projects]);

    return (
        <section id="portfolio" className="py-20 bg-zion-dark overflow-hidden">
            <div className="container-custom mb-12">
                <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 h2-gradient">
                    Portfólio
                </h2>
                <p className="text-center text-gray-400">
                    Alguns dos nossos melhores trabalhos.
                </p>
            </div>

            <div className="pl-6 md:pl-[calc((100vw-1240px)/2+1.5rem)]">
                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Carregando projetos...</p>
                        <p className="text-xs text-gray-700 mt-2">(Se nenhum projeto aparecer, vá para /studio e adicione um projeto)</p>
                    </div>
                ) : (
                    <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing overflow-hidden">
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            className="flex gap-8"
                        >
                            {projects.map((item) => (
                                <motion.div key={item._id} className="min-w-[300px] md:min-w-[450px] relative group rounded-2xl overflow-hidden aspect-video bg-gray-900 border border-white/10 shadow-lg">
                                    {item.coverImage && (
                                        <Image
                                            src={urlFor(item.coverImage).width(800).url()}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                                        />
                                    )}

                                    {/* Overlay with Play Button */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            onClick={() => setSelectedVideo(item.videoUrl)}
                                            className="w-16 h-16 bg-zion-gold/90 rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-zion-gold"
                                        >
                                            <Play fill="currentColor" className="ml-1 w-8 h-8" />
                                        </button>
                                    </div>

                                    {/* Text Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-zion-gold text-xs font-bold uppercase tracking-wider mb-2 block">{item.category}</span>
                                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
                <p className="text-center text-gray-500 text-sm mt-8 md:hidden">Deslize para ver mais</p>
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoUrl={selectedVideo || ""}
            />
        </section>
    );
}
