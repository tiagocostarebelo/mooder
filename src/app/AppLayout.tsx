type AppLayoutProps = {
    children: React.ReactNode;
    versionLabel?: string;        // "MVP" or "v0.0.1"
    topLeft?: React.ReactNode;    // optional
    topCenter?: React.ReactNode;  // selection tips, etc.
    topRight?: React.ReactNode;   // Export button etc.
};

export default function AppLayout({
    children,
    versionLabel = "MVP",
    topLeft,
    topCenter,
    topRight,
}: AppLayoutProps) {
    return (
        <div className="min-h-dvh bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
            {/* HEADER */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="flex w-full items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">

                        <div className="leading-tight">
                            <a href="/" className="text-sm font-semibold tracking-tight text-white">
                                <span className="font-bold">moodser</span>
                            </a>
                            <p className="text-xs text-slate-400">Editor</p>
                        </div>
                    </div>

                    <span className="text-xs text-slate-400">{versionLabel}</span>
                </div>
            </header>

            {/* TOP BAR (3-column: left / center / right) */}
            <div className="w-full h-16 border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="w-full flex items-center justify-between px-4 py-3">
                    {/* Left */}
                    <div className="justify-self-start">{topLeft}</div>

                    {/* Center */}
                    <div className="justify-self-center">{topCenter}</div>

                    {/* Right */}
                    <div className="justify-self-end">{topRight}</div>
                </div>
            </div>

            {/* BODY */}
            <div className="w-full">{children}</div>
        </div>
    );
}
