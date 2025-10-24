"use client";
import { useBuilder } from "@/context/builderContext";
import { MessageCircleMoreIcon } from "lucide-react";

export default function NodesPanel() {
  const { handleDragStart } = useBuilder();

  return (
    <div className="w-1/4 h-full p-4 border-l border-gray-200">
      <div className="flex flex-col gap-2">
        {/* You can add more nodes here */}
        <div
          className="w-[150px] h-[80px] flex flex-col items-center justify-center gap-2 border border-blue-500 p-2 rounded-md cursor-pointer hover:bg-blue-500 text-blue-500 hover:text-white"
          onDragStart={(event) => handleDragStart(event, "messageNode")}
          draggable
        >
          <MessageCircleMoreIcon className="w-6 h-6" />
          <span className="text-sm font-medium">Message</span>
        </div>
      </div>
    </div>
  );
}
