"use client";

import { MoveLeftIcon } from "lucide-react";

export default function SettingPanel() {
  return (
    <div className="w-1/4 h-full p-4 border-l border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div style={{ cursor: "pointer" }}>
          <MoveLeftIcon />
        </div>
        <h1 className="text-sm font-medium mx-auto">Message</h1>
      </div>
      <hr className="w-full" />

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-sm font-medium">Message Content</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <textarea
              placeholder="Enter your message"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
