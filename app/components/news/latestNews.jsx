import NewsCard from "./NewsCard";

export default function LatestNews({ posts }) {
  return (
    <section className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">
          Latest for you
        </h2>
        <p className="text-[11px] text-slate-400">
          Auto-curated from your interests (dummy for now)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
