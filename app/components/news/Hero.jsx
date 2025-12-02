import Link from "next/link";

export default function Hero({ article }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-wide text-emerald-400">
            Top story • {article.category}
            Hello
          </p>
          <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-50 leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-slate-300">{article.summary}</p>
          <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-400">
            <span>{article.source}</span>
            <span>•</span>
            <span>{article.time}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>

          <div className="mt-5 flex gap-3">
            <Link
              href={`/news/${article.id}`}
              className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 transition"
            >
              Read full story
            </Link>
            <button className="rounded-full border border-slate-600 px-4 py-2 text-xs text-slate-200 hover:bg-slate-800 transition">
              Save for later
            </button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 via-slate-900 to-slate-950 mix-blend-screen" />
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,#22c55e_0,transparent_55%),radial-gradient(circle_at_bottom,#0f172a_0,#020617_60%)]" />
          
        </div>
      </div>
    </section>
  );
}
