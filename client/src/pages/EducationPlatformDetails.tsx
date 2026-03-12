import React, { useEffect } from "react";
import {
  ArrowLeft, Cloud, Database, Globe, CreditCard, Layers, Server,
  Monitor, Smartphone, Users, Calendar, BookOpen, Shield, Zap,
} from "lucide-react";
import { Link } from "wouter";

const techStack = [
  { name: "React", icon: Globe, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { name: "AWS EC2", icon: Server, color: "text-amber-400", bg: "bg-amber-500/10" },
  { name: "CloudFront CDN", icon: Zap, color: "text-yellow-300", bg: "bg-yellow-500/10" },
  { name: "Route 53", icon: Cloud, color: "text-sky-400", bg: "bg-sky-500/10" },
  { name: "Elastic Load Balancer", icon: Layers, color: "text-violet-400", bg: "bg-violet-500/10" },
  { name: "Auto Scaling", icon: Monitor, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { name: "MySQL (RDS)", icon: Database, color: "text-blue-400", bg: "bg-blue-500/10" },
  { name: "ElastiCache", icon: Database, color: "text-red-400", bg: "bg-red-500/10" },
  { name: "S3", icon: Cloud, color: "text-green-400", bg: "bg-green-500/10" },
  { name: "Stripe API", icon: CreditCard, color: "text-indigo-400", bg: "bg-indigo-500/10" },
];

const features = [
  {
    icon: BookOpen,
    title: "Graphical Readers",
    desc: "Visual study tools that leverage graphical information to accelerate comprehension and recall.",
  },
  {
    icon: Calendar,
    title: "Study Calendars",
    desc: "Spaced-repetition scheduling that plans optimal review times based on proven memory science.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    desc: "Real-time collaboration features so students can study together and share study materials.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    desc: "Fully responsive design ensures a seamless experience on phones, tablets, and desktops.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Multi-AZ deployment with automatic failover ensures high availability and data protection.",
  },
  {
    icon: CreditCard,
    title: "Stripe Subscriptions",
    desc: "Industry-standard payment processing with Stripe for seamless subscription management.",
  },
];

const EducationPlatformDetails: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Back link */}
      <Link href="/">
        <a className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-10">
          <ArrowLeft size={16} className="mr-1" />
          Back to portfolio
        </a>
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono tracking-[0.25em] text-cyan-300">
            <Layers size={14} />
            FREELANCE PROJECT
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
          Education Platform
        </h1>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          A full-stack online education platform I built from the ground up as a freelance engagement.
          The platform uses a scientifically-proven approach to memorization — combining graphical readers,
          spaced-repetition calendars, and collaborative tools to help users study anything efficiently.
          It now operates as a profitable online business serving users globally.
        </p>
      </header>

      {/* Architecture image */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Cloud Architecture</h2>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40">
          <img
            src={`${import.meta.env.BASE_URL}edu.png`}
            alt="AWS Cloud Architecture — VPC, EC2 Auto Scaling, RDS, ElastiCache, CloudFront, Route 53, Stripe"
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Classic AWS web-app architecture with multi-AZ deployment, auto-scaling EC2 fleet, RDS MySQL,
          ElastiCache (Memcached), CloudFront CDN, and Stripe for payment processing.
        </p>
      </section>

      {/* Tech stack */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {techStack.map(({ name, icon: Icon, color, bg }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-white/15 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={16} className={color} />
              </div>
              <span className="text-xs text-slate-300 font-medium leading-tight">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key features */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-cyan-500/20 transition-colors"
            >
              <Icon size={20} className="text-cyan-400 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed description */}
      <section className="mb-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">What I Built</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            I designed and delivered the <span className="text-cyan-300">entire platform</span> —
            from architecture and cloud infrastructure to the React frontend and production deployment on AWS.
            I set up the VPC, configured auto-scaling groups, provisioned RDS instances, and integrated
            Stripe's subscription APIs.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            I built it for <span className="text-cyan-300">elastic scale</span> from day one:
            traffic spikes during exam seasons are handled automatically by EC2 auto-scaling behind an
            Elastic Load Balancer, while CloudFront serves static assets globally with minimal latency.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Impact & Outcome</h2>
          <ul className="space-y-3">
            {[
              "Platform launched and operating as a profitable online business",
              "Handles traffic spikes seamlessly via AWS auto-scaling",
              "Global reach through CloudFront CDN with sub-100ms asset delivery",
              "Zero-downtime deployments with multi-AZ architecture",
              "Stripe integration processes thousands of subscription payments monthly",
              "Built entirely on open-source software, keeping operational costs predictable",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="pt-8 border-t border-white/[0.06] text-xs text-slate-500">
        <p>
          This project was delivered as a freelance engagement. The platform is live and serving users —
          specific URLs and client details are kept confidential under NDA.
        </p>
      </footer>
    </div>
  </div>
  );
};

export default EducationPlatformDetails;
