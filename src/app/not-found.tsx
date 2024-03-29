import { routesPath } from '@/common';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={routesPath.TIME_TRACKER}>Return Home</Link>
    </div>
  );
}
