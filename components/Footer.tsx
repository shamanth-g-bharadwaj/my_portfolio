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

                <div className="mt-2 space-y-1.5">
                    <p className="text-xs text-muted-foreground/60 tracking-wide">
                        Designed &amp; developed by{' '}
                        <span className="text-primary font-semibold">
                            Shamanth G Bharadwaj
                        </span>
                    </p>
                    <p className="text-xs text-muted-foreground/40 tracking-wide">
                        Co-authored with{' '}
                        <span className="text-secondary/60 font-medium">Claude</span>
                        {' '}·{' '}
                        <span>Anthropic</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
