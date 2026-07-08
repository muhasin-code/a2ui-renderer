// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-3 border border-red-300 bg-red-50 text-red-700 rounded-md text-sm">
            <p className="font-semibold">⚠️ Could not render this component.</p>
            <details className="mt-1">
              <summary className="cursor-pointer text-xs underline">Details</summary>
              <pre className="text-xs mt-1 whitespace-pre-wrap">
                {this.state.error?.message}
              </pre>
            </details>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
