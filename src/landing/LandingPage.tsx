import { useNavigate } from "react-router";
import { Play, Palette, Layers, MousePointer2, Zap, Download, Sparkles } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import moodboardThinking from "../assets/support_thinking.webp";
import moodboardHero from "../assets/app_preview.webp";
import composeImg from "../assets/composeImg.webp";
import notesImg from "../assets/notesImg.webp";
import paletteImg from "../assets/paletteImg.webp";
import imagesImg from "../assets/imagesImg.webp";
import uiImg from "../assets/uiImg.webp";
import exportImg from "../assets/exportImg.webp";

type SectionVariant = "dark" | "light";

type SectionShellProps = {
    id: string;
    variant: SectionVariant;
    className?: string;
    children: React.ReactNode;
};

type CardVariant = "dark" | "light";

type CardProps = {
    variant: CardVariant;
    className?: string;
    hover?: boolean;
    children: React.ReactNode;
};

type RevealProps = {
    show: boolean;
    delayMs?: number;
    className?: string;
    children: React.ReactNode;
};

const Reveal = ({ show, delayMs = 0, className = "", children }: RevealProps) => {
    const [reduceMotion, setReduceMotion] = React.useState(false);

    React.useEffect(() => {
        const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        if (!media) return;

        const update = () => setReduceMotion(media.matches);
        update();

        // Safari fallback
        if (media.addEventListener) {
            media.addEventListener("change", update);
            return () => media.removeEventListener("change", update);
        } else {
            media.addListener(update);
            return () => media.removeListener(update);
        }
    }, []);

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const delayClass =
        delayMs === 0
            ? ""
            : delayMs === 100
                ? "delay-100"
                : delayMs === 150
                    ? "delay-150"
                    : delayMs === 200
                        ? "delay-200"
                        : delayMs === 250
                            ? "delay-250"
                            : delayMs === 300
                                ? "delay-300"
                                : delayMs === 350
                                    ? "delay-350"
                                    : delayMs === 400
                                        ? "delay-400"
                                        : delayMs === 450
                                            ? "delay-450"
                                            : delayMs === 500
                                                ? "delay-500"
                                                : "";

    return (
        <div
            className={[
                "transition-all duration-700 ease-out will-change-transform",
                delayClass,
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
};

const cardTokens = {
    dark: {
        base: "border-white/10 bg-white/5 text-white",
        hover:
            "hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02]",
        shadow: "shadow-2xl",
        backdrop: "backdrop-blur-xl",
    },
    light: {
        base: "border-slate-200 bg-white/70 text-slate-900",
        hover: "hover:border-slate-300 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.02]",
        shadow: "shadow-xl",
        backdrop: "backdrop-blur-xl",
    },
} as const;

const textTokens = {
    dark: {
        h: "text-white",
        p: "text-slate-300",
        muted: "text-slate-400",
    },
    light: {
        h: "text-slate-900",
        p: "text-slate-600",
        muted: "text-slate-500",
    },
} as const;

const Card = ({ variant, className = "", hover = true, children }: CardProps) => {
    const t = cardTokens[variant];
    return (
        <div
            className={[
                "relative group overflow-hidden rounded-2xl border transition-all duration-500",
                t.base,
                t.shadow,
                t.backdrop,
                hover ? t.hover : "",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
};

/**
 * Alternating section wrapper:
 * - dark: transparent (inherits page gradient) + dark orbs
 * - light: white background + stronger orbs
 */
const SectionShell = ({ id, variant, className = "", children }: SectionShellProps) => {
    const base = "relative overflow-hidden py-20";
    const surface = variant === "dark" ? "bg-transparent" : "bg-white";

    return (
        <section id={id} data-animate-section className={`${base} ${surface} ${className}`}>
            {/* Orb background */}
            <div className="pointer-events-none absolute inset-0">
                {variant === "dark" ? (
                    <>
                        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-pink-500/10 to-violet-500/10 blur-3xl" />
                        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl" />
                    </>
                ) : (
                    <>
                        <div className="absolute -left-24 top-10 h-[520px] w-[520px] animate-pulse rounded-full bg-gradient-to-br from-pink-500/20 to-violet-500/20 blur-3xl" />
                        <div className="absolute -right-24 bottom-10 h-[520px] w-[520px] animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl" />
                        <div className="absolute left-1/3 top-1/3 h-[420px] w-[420px] animate-pulse rounded-full bg-gradient-to-br from-amber-500/15 to-orange-500/15 blur-3xl" />
                    </>
                )}
            </div>

            {/* Subtle noise for light sections */}
            {variant === "light" && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                    }}
                />
            )}

            <div className="relative">{children}</div>
        </section>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const isSectionVisible = (sectionId: string) => visibleSections.has(sectionId);

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleSections((prev) => {
                    const next = new Set(prev);
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) next.add(entry.target.id);
                    });
                    return next;
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
        );

        const sections = document.querySelectorAll<HTMLElement>("[data-animate-section]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const features = useMemo(
        () => [
            {
                icon: Palette,
                title: "Images, notes, and color",
                description: "The essentials for moodboards, no extra modules to learn.",
                color: "from-pink-500 to-rose-500",
            },
            {
                icon: Layers,
                title: "Simple layer control",
                description: "Stack elements with precision. Bring forward and send back with a simple click.",
                color: "from-violet-500 to-purple-500",
            },
            {
                icon: MousePointer2,
                title: "Canvas-first editing",
                description: "Move elements freely, resize, and refine the layout as you think.",
                color: "from-blue-500 to-cyan-500",
            },
            {
                icon: Sparkles,
                title: "Instant feedback",
                description: "Edits happen immediately as you drag and adjust—no modal workflows.",
                color: "from-fuchsia-500 to-pink-500",
            },
            {
                icon: Zap,
                title: "Keyboard shortcuts",
                description: "Arrow keys to nudge, Shift for precision, Delete to remove. Power user ready.",
                color: "from-amber-500 to-orange-500",
            },
            {
                icon: Download,
                title: "Export ready",
                description: "Export high-quality PNG images of your moodboards instantly.",
                color: "from-emerald-500 to-teal-500",
            },
        ],
        []
    );

    const useCases = useMemo(
        () => [
            {
                title: "Brand direction",
                description: "Collect references, test palettes, and align on a visual lane.",
                gradient: "from-purple-500 to-indigo-500",
            },
            {
                title: "UI moodboards",
                description: "Capture patterns, components, and layout inspiration in one canvas.",
                gradient: "from-blue-500 to-cyan-500",
            },
            {
                title: "Campaign planning",
                description: "Map visual direction for launches, ads, and content themes.",
                gradient: "from-orange-500 to-amber-500",
            },
            {
                title: "Client concepts",
                description: "Present a direction clearly—without a heavy deck or toolchain.",
                gradient: "from-pink-500 to-rose-500",
            },
        ],
        []
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Reveal show={isVisible} delayMs={0}>
                        <h1 className="text-lg font-semibold text-white">moodser</h1>
                        <p className="text-sm text-slate-400">Visual thinking on a canvas</p>
                    </Reveal>

                    <Reveal show={isVisible} delayMs={100}>
                        <button
                            onClick={() => navigate("/app")}
                            className="cursor-pointer rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/30"
                        >
                            Start creating
                        </button>
                    </Reveal>
                </div>
            </header>

            {/* Hero (dark) */}
            <section id="hero" data-animate-section className="relative overflow-hidden py-20 md:py-32">
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-3xl transition-transform duration-300 ease-out"
                        style={{
                            transform: `translate(${mousePosition.x * 0.02 - 300}px, ${mousePosition.y * 0.02 - 300}px)`,
                        }}
                    />
                    <div
                        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl transition-transform duration-300 ease-out"
                        style={{
                            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
                        }}
                    />
                    <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-3xl" />
                </div>

                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                    }}
                />

                <div className="container relative mx-auto px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <Reveal show={isVisible} delayMs={300}>
                            <h1
                                className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                Compose Your
                                <span className="relative mx-3 inline-block">
                                    <span className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 blur-xl opacity-70" />
                                    <span className="relative bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                        Vision
                                    </span>
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal show={isVisible} delayMs={100}>
                            <p className="mb-10 text-lg leading-relaxed text-slate-300 md:text-xl">
                                For designers, creators, and teams shaping ideas.
                                <br />
                                Collect images, colors, and notes in one place, no file saving, no heavy editor, no endless menus.
                            </p>
                        </Reveal>

                        <Reveal show={isVisible} delayMs={200}>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <button
                                    onClick={() => navigate("/app")}
                                    className="cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-8 py-3.5 text-base font-medium text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-purple-500/70"
                                >
                                    Start creating
                                </button>

                                <button
                                    onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                                    className="cursor-pointer flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10"
                                >
                                    <Play className="h-4 w-4" />
                                    Watch demo
                                </button>
                            </div>
                        </Reveal>

                        <Reveal show={isVisible} delayMs={400}>
                            <div className="mt-16">
                                <div className="relative mx-auto mt-16 max-w-6xl rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
                                    <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
                                        <img
                                            src={moodboardHero}
                                            alt="Moodboard Composer app interface"
                                            className="w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Showcase */}
            <SectionShell id="showcase" variant="light">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-6xl">
                        <Reveal show={isSectionVisible("showcase")} delayMs={100} className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                                Built as a focused, design-first experiment.
                            </h2>
                            <p className="mt-3 text-lg text-slate-600">
                                <span className="font-bold">moodser</span> was built for the start of a project: collecting references, testing colors, and writing quick
                                notes. Most workflows force you to download assets, open a bulky tool, and fight UI just to place a few
                                images and swatches. <span className="font-bold">moodser</span> keeps it simple: one canvas, the essentials, and you’re moving fast.
                            </p>
                        </Reveal>

                        <div className="flex flex-col gap-6">
                            {/* Row 1 */}
                            <div className="flex flex-col gap-6 md:flex-row">
                                <Reveal show={isSectionVisible("showcase")} delayMs={200} className="flex-[2]">
                                    <Card variant="light" className="p-0" hover>
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-violet-500 opacity-90" />
                                            <div className="relative p-6">
                                                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                                                    Canvas
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-white">Drag. Drop. Compose.</h3>
                                                <p className="mt-2 text-sm text-white/90">
                                                    Add elements and move them freely—no rigid layout grid.
                                                </p>

                                                <div className="mt-6 overflow-hidden rounded-xl bg-white/10">
                                                    <img
                                                        src={composeImg}
                                                        alt="Moodboard composition example"
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>

                                <Reveal show={isSectionVisible("showcase")} delayMs={250} className="flex-1">
                                    <Card variant="light" className="p-0" hover>
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-400 opacity-90" />
                                            <div className="relative p-6">
                                                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                                                    Notes
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-white">Capture thoughts</h3>
                                                <p className="mt-2 text-sm text-white/90">
                                                    Write context next to references, where you’ll actually use it.
                                                </p>

                                                <div className="mt-6 overflow-hidden rounded-xl bg-white/10">
                                                    <img
                                                        src={notesImg}
                                                        alt="Notes next to your references"
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            </div>

                            {/* Row 2 */}
                            <div className="flex flex-col gap-6 md:flex-row">
                                <Reveal show={isSectionVisible("showcase")} delayMs={300} className="flex-1">
                                    <Card variant="light" className="p-0" hover>
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-500 opacity-90" />
                                            <div className="relative p-6">
                                                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                                                    Colors
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-white">Palette blocks</h3>
                                                <p className="mt-2 text-sm text-white/90">
                                                    Drop colors onto the board to explore direction and contrast.
                                                </p>

                                                <div className="mt-6 overflow-hidden rounded-xl bg-white/10">
                                                    <img
                                                        src={paletteImg}
                                                        alt="Palette blocks example"
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>

                                <Reveal show={isSectionVisible("showcase")} delayMs={350} className="flex-[2]">
                                    <Card variant="light" className="p-0" hover>
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 opacity-90" />
                                            <div className="relative p-6">
                                                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                                                    Images
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-white">Image references</h3>
                                                <p className="mt-2 text-sm text-white/90">
                                                    Bring in images fast and compose them like a board, not a gallery.
                                                </p>

                                                <div className="mt-6 overflow-hidden rounded-xl bg-white/10">
                                                    <img
                                                        src={imagesImg}
                                                        alt="Image references collage"
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            </div>

                            {/* Row 3 */}
                            <div className="flex flex-col gap-6 md:flex-row">
                                <Reveal show={isSectionVisible("showcase")} delayMs={400} className="flex-[2]">
                                    <Card variant="light" className="p-0" hover>
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700 opacity-95" />
                                            <div className="relative p-6">
                                                <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                                                    Focused workflow
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-white">Minimal UI</h3>
                                                <p className="mt-2 text-sm text-white/80">
                                                    One canvas. Full attention. Minimal controls.
                                                </p>

                                                <div className="mt-6 overflow-hidden rounded-xl bg-white/10">
                                                    <img
                                                        src={uiImg}
                                                        alt="App UI preview"
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>

                                <Reveal show={isSectionVisible("showcase")} delayMs={450} className="flex-1">
                                    <Card variant="light" className="p-0" hover>
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-90" />
                                            <div className="relative p-6">
                                                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                                                    Export
                                                </div>
                                                <h3 className="mt-3 text-xl font-semibold text-white">PNG-ready</h3>
                                                <p className="mt-2 text-sm text-white/90">
                                                    Download a crisp PNG when the board feels right.
                                                </p>

                                                <div className="mt-6 overflow-hidden rounded-xl bg-white/10">
                                                    <img
                                                        src={exportImg}
                                                        alt="Exported PNG example"
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionShell>

            {/* Features (dark) */}
            <SectionShell id="features" variant="dark">
                <div className="container mx-auto px-6">
                    <Reveal show={isSectionVisible("features")} delayMs={100} className="mb-16 text-center">
                        <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${textTokens.dark.h}`}>
                            What you can do on the canvas
                        </h2>
                        <p className={`text-lg ${textTokens.dark.p}`}>A small toolset that covers the full moodboard loop.</p>
                    </Reveal>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Reveal key={feature.title} show={isSectionVisible("features")} delayMs={200 + index * 50}>
                                <Card variant="dark" className="p-8">
                                    <div
                                        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                                    >
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                                    <p className="leading-relaxed text-slate-300">{feature.description}</p>
                                    <div
                                        className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                                    />
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </SectionShell>

            {/* Philosophy (light) */}
            <SectionShell id="philosophy" variant="light">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            <Reveal show={isSectionVisible("philosophy")} delayMs={200}>
                                <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
                                    Designed for thinking,
                                    <br />
                                    not managing.
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        { text: "One canvas. Full attention", },
                                        { text: "No account. No workspaces", },
                                        { text: "No infinite menus", },
                                        { text: "Made for desktop and tablet", },
                                    ].map((item, index) => (
                                        <Reveal

                                            key={index}
                                            show={isSectionVisible("philosophy")}
                                            delayMs={300 + index * 100}
                                        >
                                            <div className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-slate-200 hover:bg-slate-50">

                                                <span className="text-lg text-slate-700">{item.text}</span>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </Reveal>

                            <Reveal show={isSectionVisible("philosophy")} delayMs={400}>
                                <div className="sticky top-24">
                                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                        <img
                                            src={moodboardThinking}
                                            alt="Moodboard Composer preview"
                                            className="h-auto w-full object-cover"
                                        />
                                        <div className="border-t border-slate-200 px-4 py-3 text-center text-sm text-slate-500">
                                            Visual composition preview
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </SectionShell>

            {/* Demo (dark) */}
            <SectionShell id="demo" variant="dark">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <Reveal show={isSectionVisible("demo")} delayMs={100}>
                            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">See a board come together</h2>
                            <p className="mb-4 text-lg text-slate-300">A quick walkthrough, from blank canvas to export.</p>
                            <p className="mb-12 text-sm text-slate-400">Add images • drop a palette • export a PNG</p>
                        </Reveal>

                        <Reveal show={isSectionVisible("demo")} delayMs={300}>
                            <Card variant="dark" className="relative p-8" hover={false}>
                                {/* glow */}
                                <div className="pointer-events-none absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-r from-pink-500/30 via-violet-500/30 to-cyan-500/30 blur-2xl" />

                                {/* frame */}
                                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                                    {/* aspect wrapper */}
                                    <div className="relative aspect-video">
                                        <video
                                            src="https://res.cloudinary.com/dfnqamudd/video/upload/f_auto,q_auto/Moodser_-_Video_intro_utcupt"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            poster="https://res.cloudinary.com/dfnqamudd/image/upload/f_auto,q_auto/Moodser_video_poster"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />

                                        {/* subtle dark gradient for readability */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />


                                    </div>

                                    {/* optional caption row */}
                                    <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-white/60">
                                        <span>Quick walkthrough • from blank canvas to export</span>
                                        <span className="hidden sm:inline">~59s</span>
                                    </div>
                                </div>
                            </Card>
                        </Reveal>

                    </div>
                </div>
            </SectionShell>

            {/* Use Cases (light) */}
            <SectionShell id="use-cases" variant="light">
                <div className="container mx-auto px-6">
                    <Reveal show={isSectionVisible("use-cases")} delayMs={100} className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Use it for real work</h2>
                        <p className="text-lg text-slate-600">From early exploration to final direction.</p>
                    </Reveal>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {useCases.map((useCase, index) => (
                            <Reveal key={useCase.title} show={isSectionVisible("use-cases")} delayMs={200 + index * 50}>
                                <Card variant="light" className="p-6">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.07]`}
                                    />
                                    <div className="relative">
                                        <h3 className="mb-3 text-lg font-semibold text-slate-900">{useCase.title}</h3>
                                        <p className="text-sm leading-relaxed text-slate-600">{useCase.description}</p>
                                    </div>
                                    <div
                                        className={`absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-gradient-to-br ${useCase.gradient} opacity-25 blur-xl transition-opacity duration-300 group-hover:opacity-40`}
                                    />
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </SectionShell>

            {/* CTA (dark) */}
            <SectionShell id="cta" variant="dark">
                <div className="container mx-auto px-6">
                    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 p-12 backdrop-blur-xl md:p-20">
                        <div className="absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-3xl" />

                        <div className="relative text-center">
                            <Reveal show={isSectionVisible("cta")} delayMs={100}>
                                <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">Start a new board in seconds.</h2>
                            </Reveal>

                            <Reveal show={isSectionVisible("cta")} delayMs={200}>
                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <button
                                        onClick={() => navigate("/app")}
                                        className="cursor-pointer rounded-lg bg-white px-8 py-3.5 text-base font-bold text-slate-900 shadow-2xl transition-all hover:scale-105 hover:shadow-white/20"
                                    >
                                        Open the editor
                                    </button>

                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </SectionShell>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black/20 py-12 backdrop-blur-xl">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                        <div>
                            <p className="text-sm text-slate-400">© 2026 <span className="font-bold">moodser</span></p>
                            <p className="mt-1 text-sm text-slate-500">
                                Built by{" "}
                                <a
                                    href="https://tiagocr.me"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline underline-offset-4"
                                >
                                    Tiago Costa Rebelo
                                </a>
                            </p>
                        </div>
                        <div className="flex items-center gap-6">

                            <span className="text-xs text-slate-500">v1.0</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
