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
import { ToastContainer, toast } from "react-toastify";

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
  handleSaveNodeChanges: () => void;
  confirmSaveNodeChanges: () => void;
  focusTextarea: boolean;
  setFocusTextarea: (focus: boolean) => void;
  handleDeleteNode: (id: string) => void;
  confirmDeleteNode: (id: string) => void;
  confirmationModal: {
    show: boolean;
    nodeId: string | null;
    message: string;
    type: "delete" | "save";
  };
  setConfirmationModal: (modal: {
    show: boolean;
    nodeId: string | null;
    message: string;
    type: "delete" | "save";
  }) => void;
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
  handleSaveNodeChanges: () => {},
  confirmSaveNodeChanges: () => {},
  focusTextarea: false,
  setFocusTextarea: () => {},
  handleDeleteNode: () => {},
  confirmDeleteNode: () => {},
  confirmationModal: {
    show: false,
    nodeId: null,
    message: "",
    type: "delete",
  },
  setConfirmationModal: () => {},
});

export const BuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nodes, setNodes] = useState<Node[]>(() => {
    if (typeof window !== "undefined") {
      const nodes = JSON.parse(localStorage.getItem("nodes") || "[]");
      return nodes.length > 0 ? nodes : initialNodes;
    }
    return initialNodes;
  });
  const [edges, setEdges] = useState<Edge[]>(() => {
    if (typeof window !== "undefined") {
      const edges = JSON.parse(localStorage.getItem("edges") || "[]");
      return edges.length > 0 ? edges : initialEdges;
    }
    return initialEdges;
  });

  const [type, setType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState({
    id: "",
    isEditing: false,
    messageContent: "",
  });
  const [messageContent, setMessageContent] = useState("");
  const [focusTextarea, setFocusTextarea] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    nodeId: null as string | null,
    message: "",
    type: "delete" as "delete" | "save",
  });

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
    if (isEditing.id === id && isEditing.isEditing) {
      setFocusTextarea(true);
      setTimeout(() => setFocusTextarea(false), 100);
      return;
    }

    setIsEditing({
      id: id,
      isEditing: isEditing.id === id ? !isEditing.isEditing : true,
      messageContent: messageContent,
    });

    if (isEditing.id !== id || !isEditing.isEditing) {
      setFocusTextarea(true);
      setTimeout(() => setFocusTextarea(false), 100);
    }
  };

  const handleSaveNodeChanges = () => {
    setConfirmationModal({
      show: true,
      nodeId: null,
      message:
        "Are you sure you want to save all your changes? This will update your chat flow configuration.",
      type: "save",
    });
  };

  const confirmSaveNodeChanges = () => {
    // If the any node is not connected to any other node show validation error
    const nodesNotConnected = nodes.filter((node) => {
      return !edges.some(
        (edge) => edge.source === node.id || edge.target === node.id
      );
    });

    if (nodesNotConnected.length > 0) {
      toast.error(
        "Node must be connected to at least one other node: " +
          nodesNotConnected.map((node) => node.id).join(", ")
      );
      setConfirmationModal({
        show: false,
        nodeId: null,
        message: "",
        type: "delete",
      });
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
    }
    toast.success("Node changes saved");
    setConfirmationModal({
      show: false,
      nodeId: null,
      message: "",
      type: "delete",
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
        data: { label: `${type} node`, messageContent: "Enter your message" },
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

  const handleDeleteNode = (id: string) => {
    // Find the node to get its message content for the confirmation message
    const nodeToDelete = nodes.find((node) => node.id === id);
    const messageContent = nodeToDelete?.data?.messageContent || "this message";

    setConfirmationModal({
      show: true,
      nodeId: id,
      message: `Are you sure you want to delete the message "${messageContent}"? This action cannot be undone.`,
      type: "delete",
    });
  };

  const confirmDeleteNode = (id: string) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
    toast.success("Node deleted successfully");
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
        handleSaveNodeChanges,
        confirmSaveNodeChanges,
        focusTextarea,
        setFocusTextarea,
        handleDeleteNode,
        confirmDeleteNode,
        confirmationModal,
        setConfirmationModal,
      }}
    >
      <ToastContainer position="top-center" />
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
