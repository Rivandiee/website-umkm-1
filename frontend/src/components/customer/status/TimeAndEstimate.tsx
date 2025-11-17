// src/components/customer/status/TimeAndEstimate.tsx
"use client";

import { motion } from "framer-motion";
import { Clock, Bell } from "lucide-react";

interface TimeAndEstimateProps {
  timeElapsed: number;
  formatTime: (seconds: number) => string;
}

export default function TimeAndEstimate({
  timeElapsed,
  formatTime,
}: TimeAndEstimateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-2 gap-4"
    >
      <div className="bg-white rounded-2xl shadow-md p-5">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="text-blue-600" size={24} />
          <span className="text-sm text-gray-600">Waktu Berlalu</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatTime(timeElapsed)}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="text-orange-600" size={24} />
          <span className="text-sm text-gray-600">Estimasi</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">15-20 min</p>
      </div>
    </motion.div>
  );
}
