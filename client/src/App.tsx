import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import Portfolio from "./pages/Portfolio";
import LLMCouncilDetails from "./pages/LLMCouncilDetails";
import InsightForgeDetails from "./pages/InsightForgeDetails";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-400 mb-8">Please refresh the page</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-500 text-slate-950 rounded-lg font-bold hover:bg-cyan-400 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={Portfolio} />
            <Route path="/projects/llm-council" component={LLMCouncilDetails} />
            <Route path="/projects/insightforge" component={InsightForgeDetails} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
