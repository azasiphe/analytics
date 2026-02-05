"use client";
import { Clock, Mail, CalendarDays } from "lucide-react";

const activities = [
  {
    type: "meeting",
    icon: CalendarDays,
    title: "Team Meeting",
    time: "09:00 AM",
    desc: "Discussed Q1 goals and project updates."
  },
  {
    type: "email",
    icon: Mail,
    title: "Invoice Sent",
    time: "10:15 AM",
    desc: "Invoice sent to woonzorgfactuur@databalk.nu."
  },
  {
    type: "meeting",
    icon: CalendarDays,
    title: "Client Call",
    time: "01:30 PM",
    desc: "Reviewed requirements with client."
  },
  {
    type: "email",
    icon: Mail,
    title: "Reminder Email",
    time: "03:00 PM",
    desc: "Reminder sent for missing transcript."
  },
];

export default function ActivitiesFeed() {
  return (
    <div className="bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-yellow-400" />
        <span className="text-white font-bold text-lg">Activities</span>
      </div>
      <ul className="space-y-4">
        {activities.map((activity, i) => (
          <li key={i} className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-black/20 flex items-center justify-center">
              <activity.icon className={`w-5 h-5 ${activity.type === "meeting" ? "text-cyan-400" : "text-pink-400"}`} />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{activity.title}</div>
              <div className="text-purple-300 text-xs mb-1">{activity.time}</div>
              <div className="text-purple-200 text-xs">{activity.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
