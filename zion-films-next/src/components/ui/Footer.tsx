import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zion-gold/50 to-transparent" />

            <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold font-outfit text-white mb-2">ZionFilms</h3>
                    <p className="text-gray-500 font-inter text-sm max-w-xs">
                        Capturando momentos únicos com excelência cinematográfica.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-zion-gold transition-all duration-300 hover:scale-110">
                        <Instagram size={20} />
                    </Link>
                    <Link href="#" className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-zion-gold transition-all duration-300 hover:scale-110">
                        <Facebook size={20} />
                    </Link>
                    <Link href="#" className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-zion-gold transition-all duration-300 hover:scale-110">
                        <Youtube size={20} />
                    </Link>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-gray-600 text-xs font-inter mb-1">
                        © {new Date().getFullYear()} ZionFilms.
                    </p>
                    <p className="text-gray-700 text-[10px] uppercase tracking-widest">
                        Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
