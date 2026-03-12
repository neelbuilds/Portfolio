import React, { useEffect } from "react";
import {
  ArrowLeft, Cloud, Server, Globe, Smartphone, GitBranch, Layers,
  Shield, BarChart3, Scan, Lock,
} from "lucide-react";
import { Link } from "wouter";

const techStack = [
  { name: "Amazon AWS", icon: Cloud, color: "text-amber-400", bg: "bg-amber-500/10" },
  { name: "AWS Amplify", icon: Layers, color: "text-amber-300", bg: "bg-amber-500/15" },
  { name: "GraphQL", icon: GitBranch, color: "text-pink-400", bg: "bg-pink-500/10" },
  { name: "Serverless", icon: Server, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { name: "React", icon: Globe, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { name: "Ionic", icon: Smartphone, color: "text-blue-400", bg: "bg-blue-500/10" },
  { name: "Android", icon: Smartphone, color: "text-green-400", bg: "bg-green-500/10" },
];

const features = [
  {
    icon: Scan,
    title: "Temperature Screening",
    desc: "Automatic measurement of visitor temperature with configurable fever threshold; access denied when threshold is exceeded.",
  },
  {
    icon: Shield,
    title: "Face Mask Detection",
    desc: "On-device ML models detect whether the person is wearing a face mask, helping venues comply with pandemic-era rules.",
  },
  {
    icon: Lock,
    title: "Access Control",
    desc: "Staff access via RFID cards or facial recognition, making kiosks useful beyond the pandemic for building security.",
  },
  {
    icon: Smartphone,
    title: "Autonomous Kiosks",
    desc: "Tablet-on-stand devices run fully autonomously; optional cloud connection for alerts, reporting, and fleet management.",
  },
  {
    icon: BarChart3,
    title: "Admin Web Application",
    desc: "React-based admin panel for managing the device fleet, real-time monitoring, report generation, and billing.",
  },
  {
    icon: GitBranch,
    title: "GraphQL API",
    desc: "Enterprise-ready GraphQL API for integrating kiosk data and events into existing workflows and systems.",
  },
];

const cloudArchitectureAlt =
  "Temperature Kiosks cloud architecture: AWS serverless backend (Amplify, Lambda, AppSync GraphQL), " +
  "React admin web app, Android/Ionic kiosk clients with on-device ML for temperature and mask detection, " +
  "optional cloud sync for email alerts and reporting; compliant processing of health and personal data.";

const TemperatureKiosksDetails: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/">
        <a className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-10">
          <ArrowLeft size={16} className="mr-1" />
          Back to portfolio
        </a>
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono tracking-[0.25em] text-cyan-300">
            <Layers size={14} />
            FREELANCE PROJECT
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
          Temperature Kiosks Software
        </h1>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          During the pandemic, public venues had to enforce temperature checks and, in some areas, face mask compliance.
          I built the software for autonomous kiosks — a tablet on a stand with a temperature sensor — that
          measured visitors’ temperature, detected masks, and denied access when needed. Once those requirements
          were lifted, I extended the kiosks for access control using RFID cards and facial recognition.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Cloud Architecture</h2>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 flex items-center justify-center min-h-[280px]">
          <img
         src={`${import.meta.env.BASE_URL}kiosk.png`}
            alt={cloudArchitectureAlt}
            className="w-full h-auto max-h-[70vh] object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = "flex";
            }}
          />
       
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {cloudArchitectureAlt}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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

      <section className="mb-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">What I Built</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            I built the <span className="text-cyan-300">Android kiosk software</span> and the supporting
            cloud platform. The app uses fast, mobile-optimized machine learning models for computer vision
            (temperature reading, mask detection, and later facial recognition). I made the backend fully{" "}
            <span className="text-cyan-300">serverless on AWS</span>, keeping operational costs low while
            complying with strict rules for processing health and other personal data.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            I built the <span className="text-cyan-300">React admin web application</span> for
            managing the device fleet, real-time monitoring, reporting, and billing, and the{" "}
            <span className="text-cyan-300">GraphQL API</span> so clients could integrate kiosk data into
            their enterprise workflows.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Impact & Outcome</h2>
          <ul className="space-y-3">
            {[
              "Autonomous kiosks reduced staffing costs while ensuring venue compliance during the pandemic.",
              "Evolved into access control (RFID + facial recognition) after requirements were lifted.",
              "Serverless architecture keeps running costs low and predictable.",
              "Admin dashboard enables central fleet management, monitoring, and billing.",
              "GraphQL API supports integration with existing enterprise systems.",
              "Health and personal data processed in line with strict compliance requirements.",
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
          This project was delivered as a freelance engagement. Kiosk deployment and client details are
          kept confidential under NDA.
        </p>
      </footer>
    </div>
  </div>
  );
};

export default TemperatureKiosksDetails;
