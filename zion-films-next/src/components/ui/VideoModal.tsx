"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Extract YouTube ID if it's a YouTube URL
    const getEmbedUrl = (url: string) => {
        if (url.includes("youtu.be") || url.includes("youtube.com")) {
            let videoId = "";
            if (url.includes("youtu.be")) {
                videoId = url.split("youtu.be/")[1]?.split("?")[0];
            } else if (url.includes("v=")) {
                videoId = url.split("v=")[1]?.split("&")[0];
            }

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        }
        return url;
    };

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-zion-gold transition-colors z-50"
                >
                    <X size={40} />
                </button>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden relative shadow-2xl border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <iframe
                        src={getEmbedUrl(videoUrl)}
                        title="Video Player"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
