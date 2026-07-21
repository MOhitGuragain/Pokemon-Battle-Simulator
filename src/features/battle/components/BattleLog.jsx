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

  return (
    <div className="mt-10 rounded-3xl bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold">
        Battle Log
      </h2>

      <div className="h-56 space-y-2 overflow-y-auto rounded-xl bg-gray-100 p-4">
        {logs.map((log, index) => (
          <p
            key={index}
            className="text-gray-700"
          >
            {log}
          </p>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}