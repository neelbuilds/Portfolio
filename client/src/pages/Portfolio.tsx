import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  Github, Linkedin, Mail,
  ChevronDown, Code2, Database, Globe, Terminal,
  Layers, Box, Zap, Award, GitBranch, BrainCircuit, Activity, BarChart3, ArrowRight, Send,
  Server, Cpu, Shield, FlaskConical, Cloud, Network,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// THREE.JS BACKGROUND
// ============================================================================

const NeuralCoreBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xbc13fe,
      transparent: true,
      opacity: 0.6,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesMeshRef.current = particlesMesh;

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);

      if (sphereRef.current) {
        // Noticeable spin at the top, gently influenced by scroll
        sphereRef.current.rotation.x += 0.0008 + scrollProgress * 0.0015;
        sphereRef.current.rotation.y += 0.0012 + scrollProgress * 0.0025;
        sphereRef.current.position.y = Math.sin(Date.now() * 0.001 + scrollProgress) * 0.12;
        sphereRef.current.scale.setScalar(1 + scrollProgress * 0.25);
        sphereRef.current.position.z = -0.4 + scrollProgress * 0.6;
      }

      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y = mouseX * 0.04 + scrollProgress * 0.16;
        particlesMeshRef.current.rotation.x = mouseY * 0.04 + scrollProgress * 0.1;
        particlesMeshRef.current.position.z = -scrollProgress * 2;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// ============================================================================
// CUSTOM CURSOR
// ============================================================================

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const animate = () => {
      dotX += (mouseX - dotX) * 0.7;
      dotY += (mouseY - dotY) * 0.7;
      outlineX += (mouseX - outlineX) * 0.4;
      outlineY += (mouseY - outlineY) * 0.4;
      if (dotRef.current) { dotRef.current.style.left = `${dotX}px`; dotRef.current.style.top = `${dotY}px`; }
      if (outlineRef.current) { outlineRef.current.style.left = `${outlineX}px`; outlineRef.current.style.top = `${outlineY}px`; }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`fixed w-3 h-3 rounded-full pointer-events-none z-[9999] ${isHovering ? 'bg-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.8)]' : 'bg-violet-400 shadow-[0_0_15px_rgba(188,19,254,0.6)]'}`} style={{ transform: 'translate(-50%,-50%)' }} />
      <div ref={outlineRef} className={`fixed w-10 h-10 rounded-full pointer-events-none z-[9999] border ${isHovering ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'border-violet-400 shadow-[0_0_10px_rgba(188,19,254,0.3)]'}`} style={{ transform: 'translate(-50%,-50%)' }} />
    </>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation: React.FC = () => (
  <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#" className="text-2xl font-display font-bold tracking-tighter text-white hover:text-cyan-400 transition-colors">
        NEEL<span className="text-violet-400">.DEV</span>
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
        <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
        <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
        <a href="#certifications" className="hover:text-cyan-400 transition-colors">Timeline</a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
      </div>
      <a href="#contact" className="hidden md:inline-flex px-5 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 text-sm font-semibold">
        Let's Talk
      </a>
    </div>
  </nav>
);

// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

      <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight leading-tight text-white">
        Neel Patel
      </h1>

      <h2 className="text-xl md:text-3xl text-slate-300 font-light">
        Software Engineer • Problem Solver
      </h2>

      <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        AI-focused developer building serverless architectures and RAG pipelines on AWS. Skilled in microservices, APIs (REST, GraphQL), and scalable databases.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        {/* Directed to GitHub — swap href when portfolio page is ready */}
        <a
          href="https://github.com/neelpatel19"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold text-lg rounded-lg overflow-hidden hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 w-full h-full bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          <Github size={20} />
          <span className="relative z-10">View Projects</span>
        </a>
      </div>

      <div className="flex justify-center gap-6 pt-8">
        <a href="https://github.com/neelpatel19" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
          <Github size={24} />
        </a>
        <a href="https://www.linkedin.com/in/neel-patel19/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
          <Linkedin size={24} />
        </a>
        <a href="mailto:neelemsbhadran@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
          <Mail size={24} />
        </a>
      </div>

      <div className="flex justify-center pt-12">
        <ChevronDown size={32} className="text-cyan-400 animate-bounce" />
      </div>
    </div>
  </section>
);

// ============================================================================
// ABOUT SECTION
// ============================================================================

const AboutSection: React.FC = () => (
  <section id="about" className="relative py-24 px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      {/* Profile Picture — left column */}
      <div className="flex justify-center">
        <div className="relative w-68 h-68 max-w-xs md:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-full blur-2xl" />
          <div className="relative w-full h-full rounded-full border-2 border-cyan-400/60 overflow-hidden shadow-[0_0_40px_rgba(0,243,255,0.25)]">
            <img
              src={`${import.meta.env.BASE_URL}profile.png`}
              alt="Neel Patel"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Text card — right column */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 blur-xl rounded-2xl" />
        <div className="relative bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
          <h3 className="text-3xl font-display font-bold mb-6 text-white">About Me</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Hi, I&apos;m <span className="text-cyan-400 font-semibold">Neel Patel</span> — an engineer focused on
            large language models and the systems that support them. I operate like a senior backend and platform
            developer, comfortable owning architecture from whiteboard to production.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            I&apos;m comfortable across the stack: designing serverless architectures, cloud infrastructure, and
            scalable databases; building microservices and event-driven systems; and exposing everything through
            well-designed REST and GraphQL APIs. I also collaborate on the frontend using Next.js so ideas move
            smoothly from backend to user experience.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Apart from work, I love <span className="text-violet-300">destroying and rebuilding my home server lab</span>, and grounding all that tech energy in <span className="text-violet-300">gardening</span>.
          </p>

        </div>
      </div>
    </div>
  </section>
);

// ============================================================================
// PROJECTS SECTION
// ============================================================================

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "LLM Council",
      subtitle: "Multi-Agent AI Deliberation Engine",
      desc: "Multi-LLM orchestration platform where specialist agents debate, critique, and refine answers before they ever reach the user, built on top of cloud-native, serverless infrastructure.",
      features: [
        "LLM + RAG agent mesh",
        "Serverless, event-driven orchestration",
        "REST / GraphQL APIs for integration",
      ],
      icon: BrainCircuit,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      link: "View Details",
      url: "/projects/llm-council",
    },
    {
      title: "MediRAG",
      subtitle: "Clinical Decision Support System",
      desc: "AI-powered medical assistant built using a RAG pipeline that retrieves verified medical data to generate accurate, explainable responses.",
      features: ["Secure RAG Pipeline", "Vector Database Integration", "Reduced Hallucinations"],
      icon: Activity,
      color: "text-violet-400",
      bgColor: "bg-violet-500/20",
      link: "View Case Study",
      url: "https://medium.com/@neelemsbhadran/conversational-rag-with-iterative-query-reformulation-increasing-retrieval-accuracy-from-55-to-14391184c392",
    },
    {
      title: "InsightForge",
      subtitle: "Intelligent Data Analytics",
      desc: "Concept-stage AI workspace for turning messy business data into guided insights — architecture, data flows, and UX are designed, implementation is in progress.",
      features: ["Planned AI-powered exploration", "Planned automated SQL generation", "Planned BI-style dashboards"],
      icon: BarChart3,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      link: "View Details",
      url: "/projects/insightforge",
    },
  ];

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_#00f3ff]" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div key={idx} className="group bg-slate-900/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(188,19,254,0.15)] flex flex-col h-full">
                <div className={`h-12 w-12 rounded-lg ${project.bgColor} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${project.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className={`text-sm ${project.color} font-mono mb-4`}>{project.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{project.desc}</p>
                <ul className="text-xs text-slate-500 space-y-2 mb-6 border-t border-white/5 pt-4">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full bg-current ${project.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {project.url.startsWith('http') ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-cyan-300 transition-colors">
                    {project.link} <ArrowRight size={16} className="ml-1" />
                  </a>
                ) : (
                  <Link href={project.url} className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-cyan-300 transition-colors">
                    {project.link} <ArrowRight size={16} className="ml-1" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// ACHIEVEMENTS / TIMELINE SECTION
// ============================================================================

const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      year: "2024",
      title: "CVM Hackathon",
      subtitle: "2nd Rank Winner · AgroTech",
      desc: "Developed AgroTech — an AI-powered precision agriculture platform that uses computer vision and ML to detect crop diseases early, helping farmers reduce crop loss by up to 40%. The solution won 2nd place in the Advanced AI Systems track.",
      accentColor: "border-cyan-400",
      links: [],
    },
    {
      year: "2023",
      title: "CORE Java Specialization",
      subtitle: "Coursera · LearnQuest",
      desc: "Deep dive into Java fundamentals, OOP design, collections, multithreading, and best practices that power my backend and low-level problem solving.",
      accentColor: "border-violet-400",
      links: [{ text: "Show Credential", url: "https://www.coursera.org/account/accomplishments/specialization/Y8HRMAHK2WCP" }],
    },
    {
      year: "2023",
      title: "Machine Learning with Python",
      subtitle: "IBM · Coursera",
      desc: "Hands-on foundations in classical ML — regression, classification, clustering, and model evaluation with real-world datasets using Python.",
      accentColor: "border-cyan-400",
      links: [{ text: "Show Credential", url: "https://www.coursera.org/account/accomplishments/records/F4C9RENQRBSW" }],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <section id="certifications" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Achievements &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Certifications</span>
          </h2>
          <p className="text-slate-400 mt-3">From competitions to continuous learning</p>
          <div className="h-1 w-20 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_#00f3ff] mt-4" />
        </div>

        {/* TIMELINE WRAPPER — position:relative so the ball's getBoundingClientRect works */}
        <div className="relative timeline-container">

          {/* Vertical spine — perfectly centered */}
          <div
            className="hidden md:block absolute top-0 bottom-0 bg-gradient-to-b from-cyan-400/70 via-violet-400/50 to-cyan-400/70"
            style={{ left: '50%', transform: 'translateX(-50%)', width: '2px' }}
          />

          {/* Glowing travelling ball */}
          <div
            className="timeline-moving-ball hidden md:block absolute z-30 rounded-full"
            style={{
              width: '18px',
              height: '18px',
              left: '50%',
              top: '0px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #67e8f9 0%, #00f3ff 60%)',
              boxShadow: '0 0 0 4px rgba(0,243,255,0.15), 0 0 16px rgba(0,243,255,1), 0 0 40px rgba(0,243,255,0.5)',
            }}
          />

          {/* Items */}
          <div className="flex flex-col gap-20">
            {achievements.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="achievement-item relative grid grid-cols-[1fr_auto_1fr] items-center gap-0"
                >
                  {/* LEFT COLUMN */}
                  <div className="pr-10 flex justify-end">
                    {isLeft ? (
                      <div className={`achievement-card w-full max-w-md bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border-l-4 ${item.accentColor} border border-white/10 transition-all duration-300`}>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.desc}</p>
                        {item.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((link) => (
                              <a key={link.text} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 transition-colors">
                                {link.text} ↗
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-right pr-2">
                        <div className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase mb-2">{item.year}</div>
                        <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">{item.subtitle}</p>
                      </div>
                    )}
                  </div>

                  {/* CENTER DOT — this column is exactly on the spine */}
                  <div className="flex items-center justify-center" style={{ width: '2px', position: 'relative' }}>
                    <div
                      className="timeline-dot absolute rounded-full border-2 border-slate-800 bg-slate-950 transition-all duration-300 z-10"
                      style={{
                        width: '14px',
                        height: '14px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="pl-10 flex justify-start">
                    {!isLeft ? (
                      <div className={`achievement-card w-full max-w-md bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border-l-4 ${item.accentColor} border border-white/10 transition-all duration-300`}>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.desc}</p>
                        {item.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.links.map((link) => (
                              <a key={link.text} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 transition-colors">
                                {link.text} ↗
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-left pl-2">
                        <div className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase mb-2">{item.year}</div>
                        <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">{item.subtitle}</p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Footer pill */}

      </div>
    </section>
  );
};

// ============================================================================
// SKILLS SECTION
// ============================================================================

const SkillsSection: React.FC = () => {
  const skills: { name: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { name: 'Core Java', icon: Code2 },
    { name: 'Python', icon: FlaskConical },
    { name: 'React & Next.js', icon: Globe },
    { name: 'LLMs & OpenAI', icon: BrainCircuit },
    { name: 'LangChain & RAG', icon: Activity },
    { name: 'SQL & PostgreSQL', icon: Database },
    { name: 'REST & GraphQL APIs', icon: Network },
    { name: 'Docker & Containers', icon: Box },
    { name: 'Cloud & AWS', icon: Cloud },
    { name: 'Linux & Servers', icon: Server },
    { name: 'CI/CD & DevOps', icon: Cpu },
    { name: 'Distributed Systems', icon: Layers },
    { name: 'Data Analytics', icon: BarChart3 },
    { name: 'Terminal & Shell', icon: Terminal },
    { name: 'Git & Collaboration', icon: GitBranch },
    { name: 'Performance Tuning', icon: Zap },
    { name: 'Security Basics', icon: Shield },
    { name: 'Awards & Hackathons', icon: Award },
  ];

  return (
    <section id="skills" className="relative py-24 px-6 flex items-center justify-center">
      <div className="text-center z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Skill Galaxy</h2>
        <p className="text-slate-500 mb-10 text-xs uppercase tracking-[0.3em]">
          Technologies I ship with
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 px-4 py-2 text-xs md:text-sm text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 shadow-[0_0_20px_rgba(15,23,42,0.8)] hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/50 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,243,255,0.3)] group-hover:shadow-[0_0_12px_rgba(0,243,255,0.6)] transition-all">
                  <Icon className="h-3.5 w-3.5 text-cyan-400" />
                </span>
                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// CONTACT SECTION
// ============================================================================

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ email: '', message: '' });
  };

  return (
    <section id="contact" className="relative min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-2xl max-w-xl w-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Let Ideas Meet Tech</h2>
          <p className="text-slate-400 text-sm">
            Share your email and idea, and I&apos;ll get back to you with how we can build it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-mono text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">EMAIL</label>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all"
            />
          </div>
          <div className="group">
            <label className="block text-xs font-mono text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">MESSAGE</label>
            <textarea
              rows={4}
              placeholder="Tell me about your project..."
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-slate-950 font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Send Message</span>
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="border-t border-white/10 mt-8 pt-8 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Neel Patel. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN PORTFOLIO COMPONENT
// ============================================================================

const Portfolio: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section fade-in animations
    ['#about', '#projects', '#skills', '#certifications', '#contact'].forEach((id) => {
      gsap.from(id, {
        scrollTrigger: { trigger: id, start: 'top 85%' },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    });

    // ── TIMELINE BALL ──
    const ball = document.querySelector<HTMLElement>('.timeline-moving-ball');
    const items = gsap.utils.toArray<HTMLElement>('.achievement-item');

    const moveBallToItem = (item: HTMLElement) => {
      if (!ball || !ball.parentElement) return;
      const itemRect = item.getBoundingClientRect();
      const parentRect = ball.parentElement.getBoundingClientRect();
      const targetTop = itemRect.top - parentRect.top + itemRect.height / 2;
      gsap.to(ball, { top: targetTop, duration: 0.55, ease: 'power2.inOut' });
    };

    // Snap to first item on load
    if (items.length > 0) {
      setTimeout(() => moveBallToItem(items[0] as HTMLElement), 200);
    }

    items.forEach((item) => {
      const dot = item.querySelector<HTMLElement>('.timeline-dot');

      const activate = () => {
        moveBallToItem(item as HTMLElement);
        item.classList.add('achievement-active');
        if (dot) dot.classList.add('dot-active');
      };

      const deactivate = () => {
        item.classList.remove('achievement-active');
        if (dot) dot.classList.remove('dot-active');
      };

      ScrollTrigger.create({
        trigger: item,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: activate,
        onEnterBack: activate,
        onLeave: deactivate,
        onLeaveBack: deactivate,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-slate-950 text-white overflow-hidden cursor-none">
      <NeuralCoreBackground />
      <CustomCursor />
      <Navigation />

      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Portfolio;
