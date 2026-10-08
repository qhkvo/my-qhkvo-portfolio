import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

export default function NotFound({ what = 'Page' }: { what?: string }) {
  useTitle(`${what} not found - Quynh Vo`);
  return (
    <div className="not-found">
      <h1>{what} not found.</h1>
      <p>
        <Link to="/">← Back home</Link>
      </p>
    </div>
  );
}
