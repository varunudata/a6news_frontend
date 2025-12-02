import Link from "next/link";

export default function NewsCard({ article }) {
  return (
    <Link
      href={`/news/${article.id}`}
      className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between hover:border-emerald-500/60 transition"
    >
      <div>
        <p className="text-[10px] uppercase tracking-wide text-emerald-400">
          {article.category} • {article.time}
        </p>
        <h3 className="mt-2 text-sm font-semibold text-slate-50 line-clamp-2 group-hover:text-emerald-300">
          {article.title}
        </h3>
        <p className="mt-2 text-xs text-slate-400 line-clamp-3">
          {article.summary}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>{article.source}</span>
        <span>{article.readTime} min read</span>
      </div>
    </Link>
  );
}
