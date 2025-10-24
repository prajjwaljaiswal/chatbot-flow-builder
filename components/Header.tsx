"use client";
import { useBuilder } from "@/context/builderContext";
import { MessageCircleMoreIcon } from "lucide-react";

export default function Header() {
  const { handleSaveNodeChanges } = useBuilder();

  return (
    <div className="w-full h-16 bg-gray-100 flex justify-between items-center p-4">
      <div className="flex w-[500px] items-center gap-2 text-blue-500">
        <MessageCircleMoreIcon className="w-6 h-6" />
        <span className="text-2xl font-bold">Builder</span>
      </div>
      <button
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
        style={{ cursor: "pointer" }}
        onClick={handleSaveNodeChanges}
      >
        Save Changes
      </button>
    </div>
  );
}
