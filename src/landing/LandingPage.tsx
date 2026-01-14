import { useNavigate } from "react-router";
import { Github, Play, Palette, Layers, MousePointer2, Zap, Download, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const LandingPage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set(prev).add(entry.target.id));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            }
        );

        const sections = document.querySelectorAll('[data-animate-section]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: Palette,
            title: "Visual Freedom",
            description: "Drag, drop, and arrange colors, text, and images exactly how you envision them.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Layers,
            title: "Layer Control",
            description: "Stack elements with precision. Bring forward, send back, and compose with confidence.",
            color: "from-violet-500 to-purple-500"
        },
        {
            icon: MousePointer2,
            title: "Intuitive Design",
            description: "Click to select, drag to move, double-click to edit. It just works.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Zap,
            title: "Keyboard Shortcuts",
            description: "Arrow keys to nudge, Shift for precision, Delete to remove. Power user ready.",
            color: "from-amber-500 to-orange-500"
        },
        {
            icon: Download,
            title: "Export Ready",
            description: "Export high-quality PNG images of your moodboards instantly.",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: Sparkles,
            title: "Real-time Preview",
            description: "See changes as you make them. No rendering. No waiting. Pure creation.",
            color: "from-fuchsia-500 to-pink-500"
        }
    ];

    const useCases = [
        {
            title: "Brand exploration",
            description: "Collect references, explore direction, and align visually.",
            gradient: "from-purple-500 to-indigo-500",
            emoji: "🎨"
        },
        {
            title: "UI inspiration",
            description: "Gather interface patterns and design systems in one place.",
            gradient: "from-blue-500 to-cyan-500",
            emoji: "💡"
        },
        {
            title: "Content planning",
            description: "Map out campaigns with visuals, colors, and mood references.",
            gradient: "from-orange-500 to-amber-500",
            emoji: "📋"
        },
        {
            title: "Creative direction",
            description: "Present concepts clearly with visual storytelling.",
            gradient: "from-pink-500 to-rose-500",
            emoji: "✨"
        }
    ];

    const isSectionVisible = (sectionId: string) => visibleSections.has(sectionId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Header - Sticky */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <div
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
                            transition: "all 0.6s ease-out"
                        }}
                    >
                        <h1 className="text-lg font-semibold text-white">Mooder</h1>
                        <p className="text-sm text-slate-400">Visual thinking, simplified</p>
                    </div>
                    <button
                        onClick={() => navigate("/app")}
                        className="rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
                            transition: "all 0.6s ease-out 0.1s"
                        }}
                    >
                        Open editor
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section id="hero" data-animate-section className="relative overflow-hidden py-20 md:py-32">
                {/* Enhanced gradient orbs with pulsing */}
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-3xl"
                        style={{
                            top: mousePosition.y * 0.02 - 300,
                            left: mousePosition.x * 0.02 - 300,
                            transition: "all 0.3s ease-out"
                        }}
                    />
                    <div
                        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
                        style={{
                            bottom: mousePosition.y * -0.015,
                            right: mousePosition.x * -0.015,
                            transition: "all 0.3s ease-out"
                        }}
                    />
                    <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-3xl" />
                </div>

                {/* Noise texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
                    }}
                />

                <div className="container relative mx-auto px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1
                            className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "300ms",
                                fontFamily: "'Space Grotesk', sans-serif"
                            }}
                        >
                            Compose Your
                            <span className="relative mx-3 inline-block">
                                <span className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 blur-xl opacity-70" />
                                <span className="relative bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    Vision
                                </span>
                            </span>
                        </h1>

                        <p
                            className="mb-10 text-lg leading-relaxed text-slate-300 md:text-xl"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                                transition: "all 0.6s ease-out 0.1s"
                            }}
                        >
                            A simple, focused moodboard tool for designers, creators, and thinkers. <br />Collect colors, images, and notes without friction.
                        </p>

                        <div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                                transition: "all 0.6s ease-out 0.2s"
                            }}
                        >
                            <button
                                onClick={() => navigate("/app")}
                                className="rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-8 py-3.5 text-base font-medium text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-purple-500/70 cursor-pointer"
                            >
                                Start creating
                            </button>
                            <button
                                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10 cursor-pointer"
                            >
                                <Play className="h-4 w-4" />
                                Watch demo
                            </button>
                        </div>

                        {/* App Preview Placeholder */}
                        <div
                            className="relative mt-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 shadow-2xl backdrop-blur-xl"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                                transition: "all 0.8s ease-out 0.4s"
                            }}
                        >
                            {/* Pulsing glow */}
                            <div className="absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-r from-pink-500/30 via-violet-500/30 to-cyan-500/30 blur-2xl" />

                            <div className="relative aspect-video rounded-lg bg-white flex items-center justify-center shadow-2xl">
                                <p className="text-slate-600">App preview / demo video</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Credibility */}
            <section id="social-proof" data-animate-section className="relative overflow-hidden bg-gradient-to-br from-slate-900/50 to-purple-900/30 py-20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-4xl">
                        <div
                            className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
                            style={{
                                opacity: isSectionVisible('social-proof') ? 1 : 0,
                                animation: isSectionVisible('social-proof') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                animationDelay: '100ms'
                            }}
                        >
                            {/* Decorative corner accent */}
                            <div className="absolute right-0 top-0 h-32 w-32 opacity-10">
                                <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 to-violet-500" />
                                <div className="absolute right-12 top-12 h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500" />
                            </div>

                            <div className="relative text-center">
                                <div
                                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm font-medium text-pink-300 backdrop-blur-sm"
                                    style={{
                                        opacity: isSectionVisible('social-proof') ? 1 : 0,
                                        animation: isSectionVisible('social-proof') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        animationDelay: '200ms'
                                    }}
                                >
                                    <Sparkles className="h-4 w-4" />
                                    MVP Release
                                </div>

                                <p
                                    className="mb-8 text-xl leading-relaxed text-white md:text-2xl"
                                    style={{
                                        opacity: isSectionVisible('social-proof') ? 1 : 0,
                                        animation: isSectionVisible('social-proof') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        animationDelay: '300ms'
                                    }}
                                >
                                    Built as a focused, design-first experiment.
                                    <br />
                                    <span className="text-slate-300">No accounts. No clutter. Just your ideas.</span>
                                </p>

                                <div
                                    className="flex flex-wrap items-center justify-center gap-8"
                                    style={{
                                        opacity: isSectionVisible('social-proof') ? 1 : 0,
                                        animation: isSectionVisible('social-proof') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        animationDelay: '400ms'
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
                                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-300 font-medium">No accounts</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-300 font-medium">Open source</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-300 font-medium">Free forever</span>
                                    </div>
                                </div>

                                <p
                                    className="mt-8 text-sm text-slate-400"
                                    style={{
                                        opacity: isSectionVisible('social-proof') ? 1 : 0,
                                        animation: isSectionVisible('social-proof') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        animationDelay: '500ms'
                                    }}
                                >
                                    Currently in MVP — feedback welcome
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" data-animate-section className="relative overflow-hidden py-20">
                {/* Pulsing background orbs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-pink-500/10 to-violet-500/10 blur-3xl" />
                    <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl" />
                </div>

                <div className="container relative mx-auto px-6">
                    <div
                        className="mb-16 text-center"
                        style={{
                            opacity: isSectionVisible('features') ? 1 : 0,
                            animation: isSectionVisible('features') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                            animationDelay: '100ms'
                        }}
                    >
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                            Everything You Need
                        </h2>
                        <p className="text-lg text-slate-300">
                            Built for speed, designed for creativity
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/10"
                                style={{
                                    opacity: isSectionVisible('features') ? 1 : 0,
                                    animation: isSectionVisible('features') ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                                    animationDelay: `${200 + index * 50}ms`
                                }}
                            >
                                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed text-slate-300">
                                    {feature.description}
                                </p>
                                <div className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why It's Different */}
            <section id="philosophy" data-animate-section className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 py-20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Left side - Main content */}
                            <div>
                                <div
                                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 backdrop-blur-sm"
                                    style={{
                                        opacity: isSectionVisible('philosophy') ? 1 : 0,
                                        animation: isSectionVisible('philosophy') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        animationDelay: '100ms'
                                    }}
                                >
                                    Our Philosophy
                                </div>

                                <h2
                                    className="mb-8 text-3xl font-bold text-white md:text-4xl"
                                    style={{
                                        opacity: isSectionVisible('philosophy') ? 1 : 0,
                                        animation: isSectionVisible('philosophy') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        animationDelay: '200ms'
                                    }}
                                >
                                    Designed for thinking,
                                    <br />
                                    not managing.
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        { text: "No accounts, no dashboards", icon: "🚫" },
                                        { text: "No infinite menus", icon: "✨" },
                                        { text: "One canvas, full focus", icon: "🎯" },
                                        { text: "Works beautifully on desktop and tablet", icon: "💻" }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-white/10 hover:bg-white/5"
                                            style={{
                                                opacity: isSectionVisible('philosophy') ? 1 : 0,
                                                animation: isSectionVisible('philosophy') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                                animationDelay: `${300 + index * 100}ms`
                                            }}
                                        >
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-lg text-slate-300">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Visual element */}
                            <div
                                className="relative"
                                style={{
                                    opacity: isSectionVisible('philosophy') ? 1 : 0,
                                    animation: isSectionVisible('philosophy') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                    animationDelay: '400ms'
                                }}
                            >
                                <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                                    <div className="space-y-4">
                                        <div className="h-4 w-3/4 rounded bg-white/10" />
                                        <div className="h-4 w-full rounded bg-white/10" />
                                        <div className="h-4 w-5/6 rounded bg-white/10" />

                                        <div className="my-6 grid grid-cols-3 gap-3">
                                            <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-rose-500" />
                                            <div className="aspect-square rounded-lg bg-gradient-to-br from-violet-500 to-purple-500" />
                                            <div className="aspect-square rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500" />
                                        </div>

                                        <div className="h-4 w-2/3 rounded bg-white/10" />
                                        <div className="h-4 w-4/5 rounded bg-white/10" />
                                    </div>

                                    <div className="mt-6 text-center text-sm text-slate-400">
                                        Visual composition preview
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo / Preview Section */}
            <section id="demo" data-animate-section className="relative overflow-hidden py-20">
                {/* Pulsing decorative elements */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-20 top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-pink-500/20 to-violet-500/20 blur-3xl" />
                    <div className="absolute -right-20 bottom-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl" />
                </div>

                <div className="container relative mx-auto px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2
                            className="mb-4 text-3xl font-bold text-white md:text-4xl"
                            style={{
                                opacity: isSectionVisible('demo') ? 1 : 0,
                                animation: isSectionVisible('demo') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                animationDelay: '100ms'
                            }}
                        >
                            See it in action.
                        </h2>
                        <p
                            className="mb-12 text-lg text-slate-300"
                            style={{
                                opacity: isSectionVisible('demo') ? 1 : 0,
                                animation: isSectionVisible('demo') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                animationDelay: '200ms'
                            }}
                        >
                            A quick walkthrough of how a moodboard comes together.
                        </p>

                        <div
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 shadow-2xl backdrop-blur-xl"
                            style={{
                                opacity: isSectionVisible('demo') ? 1 : 0,
                                animation: isSectionVisible('demo') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                animationDelay: '300ms'
                            }}
                        >
                            {/* Pulsing glow */}
                            <div className="absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-r from-pink-500/30 via-violet-500/30 to-cyan-500/30 blur-2xl" />

                            <div className="relative aspect-video rounded-lg bg-white flex items-center justify-center shadow-2xl">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-500 shadow-lg">
                                        <Play className="h-10 w-10 text-white" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-600">Demo video placeholder</p>
                                    <p className="text-sm text-slate-400">Coming soon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" data-animate-section className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 py-20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div
                        className="mb-16 text-center"
                        style={{
                            opacity: isSectionVisible('use-cases') ? 1 : 0,
                            animation: isSectionVisible('use-cases') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                            animationDelay: '100ms'
                        }}
                    >
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                            Use cases
                        </h2>
                        <p className="text-lg text-slate-300">
                            One tool, endless possibilities
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {useCases.map((useCase, index) => (
                            <div
                                key={useCase.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    opacity: isSectionVisible('use-cases') ? 1 : 0,
                                    animation: isSectionVisible('use-cases') ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                                    animationDelay: `${200 + index * 50}ms`
                                }}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

                                <div className="relative">
                                    <div className="mb-4 text-4xl">{useCase.emoji}</div>
                                    <h3 className="mb-3 text-lg font-semibold text-white">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-300">
                                        {useCase.description}
                                    </p>
                                </div>

                                {/* Decorative corner */}
                                <div className={`absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-gradient-to-br ${useCase.gradient} opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="cta" data-animate-section className="relative overflow-hidden py-20">
                {/* Pulsing background orbs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-pink-500/20 to-violet-500/20 blur-3xl" />
                    <div className="absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl" />
                </div>

                <div className="container relative mx-auto px-6">
                    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 p-12 backdrop-blur-xl md:p-20">
                        <div className="absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-3xl" />

                        <div className="relative text-center">
                            <h2
                                className="mb-8 text-3xl font-bold text-white md:text-4xl"
                                style={{
                                    opacity: isSectionVisible('cta') ? 1 : 0,
                                    animation: isSectionVisible('cta') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                    animationDelay: '100ms'
                                }}
                            >
                                Start your next moodboard.
                            </h2>

                            <div
                                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                                style={{
                                    opacity: isSectionVisible('cta') ? 1 : 0,
                                    animation: isSectionVisible('cta') ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                    animationDelay: '200ms'
                                }}
                            >
                                <button
                                    onClick={() => navigate("/app")}
                                    className="rounded-lg bg-white px-8 py-3.5 text-base font-bold text-slate-900 shadow-2xl transition-all hover:scale-105 hover:shadow-white/20 cursor-pointer"
                                >
                                    Open the editor
                                </button>
                                <a
                                    href="https://github.com/tiagocostarebelo/mooder"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10 cursor-pointer"
                                >
                                    <Github className="h-4 w-4" />
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black/20 py-12 backdrop-blur-xl">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                        <div>
                            <p className="text-sm text-slate-400">
                                © 2026 Mooder
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Built by <a href="https://tiagocr.me" target="_blank">Tiago Costa Rebelo</a>
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <a
                                href="https://github.com/tiagocostarebelo/mooder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-slate-400 transition-colors hover:text-white"
                            >
                                GitHub
                            </a>
                            <span className="text-xs text-slate-500">v1.0 MVP</span>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;