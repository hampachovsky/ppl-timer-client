import { routesPath } from '@/common';
import Link from 'next/link';

export default function NotFoundW() {
  return (
    <div>
      <h2>Not Found Login</h2>
      <p>Could not find requested resource</p>
      <Link href={routesPath.LOGIN}>Return Home</Link>
    </div>
  );
}
