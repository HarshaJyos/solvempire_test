"use client";

const metrics = [
  {
    value: "$420M+",
    label: "Enterprise Value Architected",
    bg: "bg-white text-[#0f0f10]",
    labelColor: "text-[#0f0f10]/70",
  },
  {
    value: "100%",
    label: "Unified In-House Execution",
    bg: "bg-[#3b82f6] text-[#0f0f10]",
    labelColor: "text-[#0f0f10] font-semibold",
  },
  {
    value: "200k+",
    label: "Field Cycles Processed",
    bg: "bg-white text-[#0f0f10]",
    labelColor: "text-[#0f0f10]/70",
  },
  {
    value: "0.12s",
    label: "Real-time Telemetry Latency",
    bg: "bg-white text-[#0f0f10]",
    labelColor: "text-[#0f0f10]/70",
  },
];

export function MetricsMatrix() {
  return (
    <section className="w-full bg-[#f7f6f2] border-b-2 border-[#0f0f10] py-16 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`${metric.bg} border-2 border-[#0f0f10] shadow-brutal p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1`}
            >
              <div className="font-display font-black text-4xl sm:text-5xl lg:text-5xl tracking-tight leading-none mb-3">
                {metric.value}
              </div>
              <div className={`font-mono text-xs uppercase tracking-wider ${metric.labelColor}`}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
