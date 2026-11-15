import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center text-ivory">
      <h1 className="font-serif text-4xl font-normal mb-4">404 - Page Not Found</h1>
      <p className="text-muted mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-brass hover:text-brass-hover underline">
        Return Home
      </Link>
    </div>
  );
}
