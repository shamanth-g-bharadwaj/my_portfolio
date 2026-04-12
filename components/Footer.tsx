import { GENERAL_INFO } from '@/lib/data';

const Footer = () => {
    return (
        <footer className="text-center pb-8 pt-4" id="contact">
            <div className="container">
                <p className="text-lg text-muted-foreground">Keep In Touch</p>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline hover:text-primary transition-colors"
                >
                    {GENERAL_INFO.email}
                </a>

                <p className="text-xs text-muted-foreground/50 mt-2">
                    Designed &amp; developed by Shamanth G Bharadwaj, with Claude
                </p>
            </div>
        </footer>
    );
};

export default Footer;
