"use client";
import MessageNode from "@/components/MessageNode";
import { useBuilder } from "@/context/builderContext";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export default function Builder() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useBuilder();

  const nodeTypes = {
    messageNode: MessageNode,
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
