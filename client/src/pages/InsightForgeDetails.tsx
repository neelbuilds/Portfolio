import React from "react";
import { ArrowLeft, BarChart3, Database, Layers, Network } from "lucide-react";
import { Link } from "wouter";

const InsightForgeDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/">
            <a className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Back to portfolio
            </a>
          </Link>
        </div>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono tracking-[0.25em] text-blue-300">
            <BarChart3 size={14} />
            INSIGHTFORGE (DESIGN)
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            InsightForge – AI-Assisted Analytics Workspace (In Design)
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-3xl">
            InsightForge is a planned analytics product where business users can connect their data sources, ask
            natural-language questions, and get guided insights powered by LLMs, automated SQL generation, and
            opinionated visualizations — without needing to write a single query.
          </p>
        </header>

        <section className="mb-10 grid md:grid-cols-[2fr,1.4fr] gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Design Goals</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              This project is currently in the architecture and experience design phase. The goal is to combine{" "}
              <span className="text-cyan-300">LLM-powered assistants</span> with a strong{" "}
              <span className="text-cyan-300">backend foundation</span> for performance and correctness. I&apos;m
              designing the system to handle messy schemas, multiple data sources, and governance requirements that
              real teams have.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              The implementation will reuse the skills from my other work: serverless microservices, event-driven
              ingestion pipelines, optimized data access layers, and robust APIs that can be consumed by a Next.js
              frontend and external tools.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 mb-1">Planned Capabilities</h3>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-center gap-2">
                <Database size={14} className="text-blue-300" />
                Connect to warehouse / OLAP stores (e.g. Postgres, Snowflake, BigQuery).
              </li>
              <li className="flex items-center gap-2">
                <Layers size={14} className="text-violet-300" />
                Maintain a semantic layer &amp; metrics catalog so LLMs generate safe queries.
              </li>
              <li className="flex items-center gap-2">
                <Network size={14} className="text-cyan-300" />
                REST / GraphQL APIs for dashboards, notebooks, and external integrations.
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 size={14} className="text-emerald-300" />
                Auto-suggest charts, cohorts, and drill-downs from natural language prompts.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Planned Data & Insight Flow</h2>
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 text-xs md:text-sm font-mono text-slate-200 overflow-x-auto">
            <pre className="whitespace-pre leading-relaxed">
{`Business User (Web UI / Next.js)
        |
        |  "Show monthly revenue and churn for EU customers over the last year"
        v
[ Intent Parser ]
understands entities, metrics, filters, and grain
        |
        v
[ Semantic Layer ]
maps intent to metrics + dimensions
checks access rules / row-level security
        |
        v
[ Query Planner ]
chooses optimal data source and generates SQL
delegates heavy work to warehouse / OLAP engine
        |
        v
[ Execution + Caching ]
runs query, caches normalized result
        |
        v
[ Insight Engine (LLM) ]
summarises patterns, anomalies, and suggests follow-ups
        |
        v
[ Visualization Builder ]
chooses suitable chart types and layout
returns configuration + data to the frontend`}
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Why This Matters</h2>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1.5">
            <li>Bridges the gap between &quot;ask anything&quot; LLMs and trustworthy BI workflows.</li>
            <li>Respects real constraints: data governance, performance, and cost control.</li>
            <li>Lets engineers define guardrails while giving non-technical users a friendly surface.</li>
          </ul>
        </section>

       
      </div>
    </div>
  );
};

export default InsightForgeDetails;

