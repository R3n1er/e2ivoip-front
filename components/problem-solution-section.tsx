interface Problem {
  title: string;
  description: string;
}

interface Solution {
  title: string;
  description: string;
}

interface ProblemSolutionSectionProps {
  problems: Problem[];
  solutions: Solution[];
  problemsTitle?: string;
  solutionsTitle?: string;
}

function EditorialList({ items }: { items: Array<Problem | Solution> }) {
  return (
    <ol className="border-t border-ui-border">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ui-border py-5"
        >
          <span className="font-mono text-sm tabular-nums text-gray-secondary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-semibold text-gray-dark">{item.title}</h3>
            <p className="mt-1 leading-relaxed text-ui-muted">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProblemSolutionSection({
  problems,
  solutions,
  problemsTitle = "Les limites de votre installation actuelle",
  solutionsTitle = "Ce que change une instance dédiée",
}: ProblemSolutionSectionProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="mb-8 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            {problemsTitle}
          </h2>
          <EditorialList items={problems} />
        </div>

        <div>
          <h2 className="mb-8 text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            {solutionsTitle}
          </h2>
          <EditorialList items={solutions} />
        </div>
      </div>
    </section>
  );
}
