// src/components/customer/status/StatusProgressCard.tsx
"use client";

import { motion } from "framer-motion";

interface StatusProgressCardProps {
  currentStatus: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    color: string;
    label: string;
    description: string;
    progress: number;
  };
}

export default function StatusProgressCard({
  currentStatus,
}: StatusProgressCardProps) {
  const StatusIcon = currentStatus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      <div
        className={`bg-gradient-to-r ${currentStatus.color} rounded-2xl p-6 text-white shadow-xl relative`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
              >
                <StatusIcon size={32} className="text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">
                {currentStatus.label}
              </h2>
              <p className="text-white/90">{currentStatus.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {currentStatus.progress}%
              </div>
              <div className="text-sm text-white/80">Progress</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentStatus.progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
