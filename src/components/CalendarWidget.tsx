"use client";
import { CalendarDays } from "lucide-react";

export default function CalendarWidget() {
  // For demo, just show a static calendar for January
  const days = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ];
  return (
    <div className="bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm w-full max-w-xs mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-6 h-6 text-cyan-400" />
        <span className="text-white font-bold text-lg">January</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-purple-300 text-xs mb-2">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.flat().map((day, i) => (
          <div
            key={i}
            className={`h-8 flex items-center justify-center rounded-lg ${day ? "bg-purple-800 text-white font-bold" : ""}`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
