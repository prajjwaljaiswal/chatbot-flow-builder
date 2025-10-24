import { Handle, Position } from "@xyflow/react";
import { MessageSquareIcon } from "lucide-react";
import { useBuilder } from "@/context/builderContext";

export default function MessageNode(props: { id: string }) {
  const { handleDoubleClick, isEditing } = useBuilder();

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={true}
      />
      <div
        className={`flex w-[200px] min-h-[40px] flex-col  gap-2 bg-white border ${
          isEditing.id === props.id && isEditing.isEditing
            ? "border-blue-500"
            : "border-gray-900"
        }`}
        onDoubleClick={() => handleDoubleClick(props.id)}
      >
        <div className="flex items-center gap-2 bg-blue-300 p-1">
          <MessageSquareIcon className="w-4 h-4" />
          <p className="text-sm font-medium">Send Message</p>
        </div>
        <div className="flex flex-col">
          <span className="px-2 text-sm">Message Content</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500"
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={true}
      />
    </>
  );
}
