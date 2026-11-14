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
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-800/60 text-slate-300 text-center space-y-2">
          <p className="font-bold text-amber-400">Chart is temporarily unavailable.</p>
          <p className="text-xs text-slate-400">
            An unexpected error occurred while rendering the data visualization.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
