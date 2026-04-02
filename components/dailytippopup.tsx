"use client";

import { useEffect, useState } from "react";
import { getDailyTip } from "@/lib/dailytip";

export default function DailyTipPopup({ userId }: { userId: string }) {

  const [tip, setTip] = useState<any>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    async function loadTip() {
      const data = await getDailyTip(userId);
      setTip(data);
    }

    loadTip();
  }, [userId]);

  if (!tip) return null;

  return (
    <>
      {/* Eye Icon Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          👁️
        </button>
      )}

      {/* Popup */}
      {open && (
        <div className="fixed bottom-32 right-6 bg-white p-4 shadow-xl rounded-xl w-72 animate-slideIn">

          <h3 className="font-bold text-lg mb-2">
            Daily Eye Care Tip
          </h3>

          <p className="text-gray-700">
            {tip.tip}
          </p>

          <button
            onClick={() => setOpen(false)}
            className="mt-4 text-sm text-red-500 hover:text-red-700"
          >
            Close
          </button>

        </div>
      )}
    </>
  );
}