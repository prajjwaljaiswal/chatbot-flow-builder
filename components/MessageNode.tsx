import { Handle, NodeProps, Position } from "@xyflow/react";
import { MessageSquareIcon } from "lucide-react";
import { useCallback } from "react";

export default function MessageNode(props: NodeProps) {
    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
      console.log(evt.target.value);
    }, []);

    return (
      <>
        <Handle type="target" position={Position.Top}
        className="w-3 h-3 bg-blue-500"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
        />
        <div className="flex flex-col gap-2 bg-white border border-gray-900">
          <div className="flex items-center gap-2 bg-blue-300 p-1">
            <MessageSquareIcon className="w-4 h-4" />
            <p className="text-sm font-medium">Send Message</p>
          </div>
          <div className="px-2 py-1">
            <input
              id="text"
              name="text"
              placeholder="Enter your message"
              onChange={onChange}
              className="focus:outline-none"
            />
          </div>
        </div>
        <Handle type="source" position={Position.Bottom}
        className="w-3 h-3 bg-green-500"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
        />
      </>
    );
  }