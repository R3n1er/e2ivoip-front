"use client";

const stats = [
  {
    value: "30%",
    label: "D'ÉCONOMIES RÉALISÉES",
    color: "text-red-primary",
  },
  {
    value: "4",
    label: "TERRITOIRES ULTRAMARINS",
    color: "text-[#091421]",
  },
  {
    value: "< 2h",
    label: "RÉACTIVITÉ SUPPORT",
    color: "text-red-primary",
  },
  {
    value: "0",
    label: "COUPURE DE SERVICE",
    color: "text-[#091421]",
  },
];

export function StatsSection() {
  return (
    <section className="py-32 px-8 bg-white border-t border-[#091421]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-3">
              <span
                className={`block text-5xl md:text-6xl font-black tracking-[-0.04em] ${stat.color}`}
              >
                {stat.value}
              </span>
              <span className="block text-[10px] uppercase font-black tracking-[0.3em] text-gray-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
