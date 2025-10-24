import NodesPanel from "@/components/NodesPanel";
import Builder from "@/layout/Builder";
import Header from "@/components/Header";
import { BuilderProvider } from "@/context/builderContext";

export default function Home() {
  return (
    <BuilderProvider>
      <Header />
      <div className="flex flex-row h-screen w-full">
        <Builder />
        <NodesPanel />
      </div>
    </BuilderProvider>
  );
}
