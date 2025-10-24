"use client";
import { useBuilder } from "@/context/builderContext";

export default function Header() {
  const { nodes, setNodes } = useBuilder();
  return (
    <div className="w-full h-16 bg-gray-100 flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Chat Builder</h1>
      <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
        Save Changes
      </button>
    </div>
  );
}
