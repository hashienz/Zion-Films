export function Footer() {
    return (
        <footer className="bg-zion-dark py-8 border-t border-white/5">
            <div className="container-custom text-center">
                <p className="text-zion-text text-sm">
                    © {new Date().getFullYear()} ZionFilms. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
