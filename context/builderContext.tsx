"use client";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  useReactFlow,
} from "@xyflow/react";
import { createContext, useCallback, useContext, useState } from "react";

type BuilderContextType = {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  edges: Edge[];
  isEditing: {
    id: string;
    isEditing: boolean;
    messageContent: string;
  };
  setIsEditing: (isEditing: {
    id: string;
    isEditing: boolean;
    messageContent: string;
  }) => void;
  messageContent: string;
  setMessageContent: (messageContent: string) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDoubleClick: (id: string, messageContent: string) => void;
  handleBack: () => void;
  handleMessageContentChange: (id: string, messageContent: string) => void;
};

const initialNodes: Node[] = [
  {
    id: "n1",
    type: "messageNode",
    position: { x: 0, y: 0 },
    data: { label: "Node 1", messageContent: "Hello, how are you?" },
  },
  {
    id: "n2",
    type: "messageNode",
    position: { x: 0, y: 100 },
    data: { label: "Node 2", messageContent: "I'm fine, thank you!" },
  },
];

const initialEdges: Edge[] = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n2-n3", source: "n2", target: "n3" },
];

const BuilderContext = createContext<BuilderContextType>({
  nodes: initialNodes,
  setNodes: () => {},
  edges: initialEdges,
  setEdges: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
  onConnect: () => {},
  handleDragStart: () => {},
  onDrop: () => {},
  onDragStart: () => {},
  onDragOver: () => {},
  isEditing: {
    id: "",
    isEditing: false,
    messageContent: "",
  },
  setIsEditing: () => {},
  messageContent: "",
  setMessageContent: () => {},
  handleDoubleClick: () => {},
  handleBack: () => {},
  handleMessageContentChange: () => {},
});

export const BuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [type, setType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState({
    id: "",
    isEditing: false,
    messageContent: "",
  });
  const [messageContent, setMessageContent] = useState("");

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges]
  );

  const handleDoubleClick = (id: string, messageContent: string) => {
    setIsEditing({
      id: id,
      isEditing: isEditing.id === id ? !isEditing.isEditing : true,
      messageContent: messageContent,
    });
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    setType(nodeType);
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        type: nodeType,
        position: { x: 0, y: 0 },
        data: { label: "Message" },
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        type: type,
        position: { x: 0, y: 0 },
        data: { label: "Message" },
      })
    );
    setType(type);
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.preventDefault();

      // check if the dropped element is valid
      console.log("onDrop", type);
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: crypto.randomUUID(),
        type,
        position,
        data: { label: `${type} node`, messageContent: "" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [type, screenToFlowPosition]
  );

  const handleBack = () => {
    setIsEditing({
      id: isEditing.id,
      isEditing: false,
      messageContent: isEditing.messageContent,
    });
  };

  const handleMessageContentChange = (id: string, messageContent: string) => {
    if (nodes.find((node) => node.id === id)) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: { ...node.data, messageContent: messageContent },
              }
            : node
        )
      );
      setIsEditing({
        id: id,
        isEditing: true,
        messageContent: messageContent,
      });
    }
  };

  return (
    <BuilderContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        handleDragStart,
        onDrop,
        onDragStart,
        onDragOver,
        isEditing,
        setIsEditing,
        messageContent,
        setMessageContent,
        handleDoubleClick,
        handleBack,
        handleMessageContentChange,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
};
