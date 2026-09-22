"use client";

const tickerItems = [
  "$420M+ TOTAL ENTERPRISE VALUE ARCHITECTED",
  "COMMERCIALLY DEPLOYED ACROSS 3 COUNTRIES",
  "80+ UNIQUE CNC & MECHANICAL COMPONENTS",
  "ESP32 & STM32 EMBEDDED ARCHITECTURES",
  "ZERO LOSS-OF-CONTEXT HANDOFFS",
  "99.98% REAL-TIME IOT UPTIME",
  "ISO-9001 QUALITY ASSURED WORKFLOWS",
  "FROM CAD MODEL TO PRODUCTION DEPLOYMENT",
];

export function GlobalTicker() {
  return (
    <div className="w-full bg-[#0f0f10] border-b-2 border-[#0f0f10] py-4 overflow-hidden select-none">
      <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
        {/* Double list for continuous seamless infinite loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="size-2 bg-[#3b82f6] shrink-0" />
            <span className="font-mono text-xs text-[#f7f6f2] tracking-widest uppercase font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
