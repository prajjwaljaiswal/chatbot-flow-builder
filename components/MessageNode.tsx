import { Handle, Position } from "@xyflow/react";
import { MessageCircleMoreIcon, TrashIcon } from "lucide-react";
import { useBuilder } from "@/context/builderContext";

export default function MessageNode(props: {
  id: string;
  data: { messageContent: string };
}) {
  const { handleDoubleClick, isEditing, handleDeleteNode } = useBuilder();

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
        onDoubleClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleDoubleClick(
            props.id,
            (event.target as HTMLDivElement).textContent || ""
          )
        }
      >
        <div className="flex items-center bg-blue-300 p-1">
          <MessageCircleMoreIcon className="w-4 h-4 mr-1" />
          <p
            style={{ fontSize: "12px" }}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            Send Message
          </p>

          <div
            className="w-4 h-4 text-red-500 cursor-pointer ml-auto"
            onClick={() => handleDeleteNode(props.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="px-2 text-sm">{props.data.messageContent}</span>
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
