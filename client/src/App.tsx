import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import Portfolio from "./pages/Portfolio";
import EducationPlatformDetails from "./pages/EducationPlatformDetails";
import TemperatureKiosksDetails from "./pages/TemperatureKiosksDetails";
import NotFound from "./pages/NotFound";
import { Route, Router, Switch } from "wouter";

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
  // Base path must match the GitHub Pages repo name.
  // For local dev with `vite` this is harmless — wouter strips the prefix.
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "";

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router base={base}>
            <Switch>
              <Route path="/" component={Portfolio} />
              <Route path="/projects/education-platform" component={EducationPlatformDetails} />
              <Route path="/projects/temperature-kiosks" component={TemperatureKiosksDetails} />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
