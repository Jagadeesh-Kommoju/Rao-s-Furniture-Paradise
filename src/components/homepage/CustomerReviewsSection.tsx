import { Star } from "lucide-react";
import { businessConfig } from "@/config/business";

export function CustomerReviewsSection() {
  if (
    !businessConfig.verification.isReviewsVerified ||
    businessConfig.verifiedReviews.length === 0
  ) {
    return null;
  }

  return (
    <section aria-label="Verified Customer Stories" className="py-10 md:py-12 bg-white">
      <div className="container-storefront">
        <div className="text-center mb-7">
          <h2 className="font-display text-2xl font-semibold text-walnut">
            Words from Visakhapatnam Customers
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {businessConfig.verifiedReviews.map((review) => (
            <blockquote
              key={review.id}
              className="rounded-xl border border-beige bg-ivory p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-terracotta mb-2.5">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-sm leading-relaxed text-charcoal">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              <footer className="mt-4 pt-3 border-t border-beige text-xs text-muted">
                <strong className="text-walnut">{review.authorName}</strong> ·{" "}
                {review.area} · {review.verifiedSource}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
