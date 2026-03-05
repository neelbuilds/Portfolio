import React from "react";
import { ArrowLeft, BrainCircuit, Cloud, GitBranch, Layers, Network, Server } from "lucide-react";
import { Link } from "wouter";

const LLMCouncilDetails: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono tracking-[0.25em] text-cyan-300">
            <BrainCircuit size={14} />
            LLM COUNCIL
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-display font-bold">
            Multi-Agent LLM Council for Reliable Decision-Making
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base max-w-3xl">
            LLM Council is an orchestration layer where multiple LLM agents with different specializations debate,
            critique, and refine answers. It is designed for teams that need more trustworthy AI output than a single
            model can provide, while fitting naturally into modern serverless and cloud-native stacks.
          </p>
        </header>

        <section className="mb-10 grid md:grid-cols-[2fr,1.4fr] gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Role & Responsibilities</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              I designed and implemented LLM Council as both an{" "}
              <span className="text-cyan-300">LLM / RAG engineer</span> and a{" "}
              <span className="text-cyan-300">backend developer</span> with strong experience in serverless architectures,
              cloud infrastructure, and scalable data design. The system is built around microservices that coordinate
              LLM calls, store conversation and evidence, and expose decisions through REST and GraphQL APIs.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              The platform is comfortable running in AWS with event-driven services (queues + lambdas), and is designed
              so frontend teams using Next.js can consume the APIs without needing to know any of the underlying
              orchestration complexity.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 mb-1">Tech Focus</h3>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-center gap-2">
                <BrainCircuit size={14} className="text-cyan-400" />
                Multi-LLM agents, RAG pipelines, critique & consensus loops
              </li>
              <li className="flex items-center gap-2">
                <Layers size={14} className="text-violet-400" />
                Serverless orchestration with queues / events between agents
              </li>
              <li className="flex items-center gap-2">
                <Cloud size={14} className="text-cyan-300" />
                Designed for AWS Lambda, API Gateway, and managed databases
              </li>
              <li className="flex items-center gap-2">
                <Network size={14} className="text-blue-400" />
                REST + GraphQL APIs for downstream apps and dashboards
              </li>
              <li className="flex items-center gap-2">
                <Server size={14} className="text-emerald-400" />
                Vector search + metadata store for evidence and retrieval
              </li>
              <li className="flex items-center gap-2">
                <GitBranch size={14} className="text-slate-300" />
                Modern workflows with CI/CD, feature branches, and reviews
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">High-Level Flow</h2>
          <p className="text-slate-300 text-sm mb-4">
            The diagram below shows how a request moves through the council — from the client, into the orchestrator,
            across multiple agents, and back to the caller with a final decision plus reasoning.
          </p>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 text-xs md:text-sm font-mono text-slate-200 overflow-x-auto">
            <pre className="whitespace-pre leading-relaxed">
{`Client / Frontend (Next.js)
        |
        v
[ API Layer ]
REST / GraphQL endpoint
validates input, attaches auth + tenant
        |
        v
[ Orchestrator Service ]
routes request to appropriate "council" config
creates correlation ID + event envelope
publishes message to queue / event bus
        |
        v
[ Agent Workers (Serverless) ]
- Retrieval Agent  -> pulls context via RAG
- Specialist Agents (e.g. reasoning, safety, UX)
- Critic / Judge   -> scores candidate answers
each worker is a lambda / microservice
        |
        v
[ Consensus Engine ]
aggregates opinions + scores
selects final answer
attaches reasoning, evidence, and telemetry
        |
        v
[ Response Adapter ]
formats output for channel (API, chat, dashboard)
returns structured JSON to frontend / clients`}
            </pre>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">How This Helps Teams</h2>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1.5">
            <li>Reduces hallucinations by forcing multiple agents to critique and cross-check each other.</li>
            <li>Gives product teams a single API to call, instead of manually wiring multiple LLMs and tools.</li>
            <li>Fits into existing cloud-native stacks: observability, retries, queues, and CI/CD are standard.</li>
            <li>Makes it easy to add new “experts” (agents) without breaking existing clients.</li>
          </ul>
        </section>

        <footer className="mt-12 text-xs text-slate-500">
          <p>
            Note: this project is currently internal / architectural — source code is not yet public, but the design is
            ready to be adapted for production systems.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LLMCouncilDetails;

