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
            setTimeout(() => {
                if (carousel.current) {
                    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
                }
            }, 500);
        }
    }, [projects]);

    return (
        <section id="portfolio" className="py-32 bg-zion-dark overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zion-dark via-transparent to-transparent z-10 pointer-events-none md:block hidden" />

            <div className="container-custom mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 h2-gradient font-outfit text-left">
                        Portfólio Selecionado
                    </h2>
                    <p className="text-gray-400 font-inter max-w-xl">
                        Uma coleção de momentos capturados com precisão e arte.
                    </p>
                </div>
                {/* Drag Indicator */}
                <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm font-light uppercase tracking-widest">
                    <span>Arraste</span>
                    <div className="w-12 h-[1px] bg-gray-700" />
                </div>
            </div>

            <div className="pl-6 md:pl-[MAX(1.5rem,calc((100vw-1240px)/2+1.5rem))]">
                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl mx-6 border border-white/5 border-dashed">
                        <p className="text-gray-400 font-outfit text-xl">Carregando obras...</p>
                    </div>
                ) : (
                    <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing overflow-hidden pb-12">
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            className="flex gap-8 md:gap-12"
                        >
                            {projects.map((item) => (
                                <motion.div
                                    key={item._id}
                                    className="min-w-[320px] md:min-w-[500px] relative group rounded-3xl overflow-hidden aspect-video bg-gray-900 border border-white/10 shadow-lg hover:shadow-glow transition-all duration-500"
                                >
                                    {item.coverImage && (
                                        <Image
                                            src={urlFor(item.coverImage).width(800).url()}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                    {/* Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                        <button
                                            onClick={() => setSelectedVideo(item.videoUrl)}
                                            className="w-20 h-20 bg-zion-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-all duration-500 hover:bg-white hover:text-zion-gold shadow-glow"
                                        >
                                            <Play fill="currentColor" className="ml-1 w-8 h-8" />
                                        </button>
                                    </div>

                                    {/* Text Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-zion-gold text-xs font-bold uppercase tracking-[0.2em] mb-3 block">{item.category}</span>
                                        <h3 className="font-outfit text-white font-bold text-2xl md:text-3xl leading-none">{item.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoUrl={selectedVideo || ""}
            />
        </section>
    );
}
