import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>This frontend connects to your Express backend.</p>

      <Link href="/products">Go to Products</Link>
    </main>
  );
}