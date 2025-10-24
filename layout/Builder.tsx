"use client";
import MessageNode from "@/components/MessageNode";
import NodesPanel from "@/components/NodesPanel";
import SettingPanel from "@/components/SettingPanel";
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
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragStart,
    onDragOver,
    isEditing,
  } = useBuilder();

  const nodeTypes = {
    messageNode: MessageNode,
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragStart={(event) => onDragStart(event, "messageNode")}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      {isEditing.isEditing ? <SettingPanel /> : <NodesPanel />}
    </>
  );
}
