import { useEffect, useRef } from "react";

import useBattleStore from "../store/battleStore";

export default function BattleLog() {
  const logs = useBattleStore((state) => state.battleLog);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [logs]);

  function getLogStyle(log) {
    if (log.includes("🏆"))
      return "border-yellow-500 bg-yellow-100 text-yellow-900";

    if (log.includes("💀"))
      return "border-gray-500 bg-gray-300 text-gray-900";

    if (log.includes("🔥"))
      return "border-red-500 bg-red-100 text-red-900";

    if (log.includes("💥"))
      return "border-orange-500 bg-orange-100 text-orange-900";

    if (log.includes("❤️"))
      return "border-pink-500 bg-pink-100 text-pink-900";

    if (log.includes("💢"))
      return "border-red-400 bg-red-50 text-red-800";

    if (log.includes("⚡"))
      return "border-blue-500 bg-blue-100 text-blue-900";

    if (log.includes("🔄"))
      return "border-green-500 bg-green-100 text-green-900";

    if (log.includes("❌"))
      return "border-gray-400 bg-gray-100 text-gray-700";

    return "border-slate-300 bg-white";
  }

  return (
    // <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
    <section className="overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 px-5 py-3">

        <div>
          <h2 className="text-xl font-bold text-white">
            Battle Log
          </h2>

          <p className="text-sm text-slate-300">
            Events
          </p>
        </div>

        <div className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
          LIVE
        </div>

      </div>

      {/* Log Area */}
      {/* <div className="h-80 overflow-y-auto bg-slate-100 p-5"> */}
      <div className="h-44 overflow-y-auto bg-slate-100 p-4">

        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Waiting for battle...
          </div>
        ) : (
          <div className="space-y-2">

            {logs.map((log, index) => (
              <div
                key={index}
                className={`
                  rounded-2xl
                  border-l-4
                  px-3
                  py-2
                  shadow-sm
                  transition-all
                  duration-300
                  ${getLogStyle(log)}
                `}
              >
                <div className="flex items-start gap-3">

                  <span className="min-w-[24px] text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="leading-6">
                    {log}
                  </p>

                </div>
              </div>
            ))}

            <div ref={bottomRef} />

          </div>
        )}

      </div>

    </section>
  );
}