import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function NotFound() {
  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Not Found" }]} />
      <div className="container-storefront py-16 text-center max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-semibold text-walnut">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-muted">
          The furniture page or collection you looked for may have moved.
          Explore our Visakhapatnam showroom collections instead.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-hover"
          >
            Back to Storefront
          </Link>
          <Link
            href="/collections"
            className="rounded-md border border-walnut px-5 py-2.5 text-sm font-semibold text-walnut hover:bg-walnut hover:text-white"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </main>
  );
}
