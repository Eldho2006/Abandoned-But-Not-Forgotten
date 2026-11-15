import React from 'react';

export default class ChartErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ChartErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-surface border border-terracotta/40 text-ivory text-center space-y-2">
          <p className="font-bold text-terracotta">Chart is temporarily unavailable.</p>
          <p className="text-xs text-muted">
            An unexpected error occurred while rendering the data visualization.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
