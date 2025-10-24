import Builder from "@/layout/Builder";
import Header from "@/components/Header";
import { BuilderProvider } from "@/context/builderContext";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
  return (
    <ReactFlowProvider>
      <BuilderProvider>
        <Header />
        <div className="flex flex-row h-screen w-full">
          <Builder />
        </div>
      </BuilderProvider>
    </ReactFlowProvider>
  );
}
