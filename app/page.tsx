import GraphVisualiser from "@/components/GraphVisualiser";
import JSONFileUploader from "../components/JSONFileUploader";
import AccordionMain from "@/components/AccordionMain";
import Example from "@/components/Example";
import UserGraphGeneration from "@/components/UserGraphGeneration";

export default function Home() {
  return (
    <>
      <h1 className="font-semibold text-3xl text-center">
        Data Visualisation{" "}
      </h1>
      <p className="text-xl text-center mt-4">
        This simple Data Visualization app is designed to provide users with a
        graphical representation of network connections between various nodes
        and carriers, using interactive force-directed graphs. The application
        allows users to upload JSON files containing structured data, which is
        then processed and visualized in a dynamic graph format. This app is
        particularly useful for analyzing and understanding complex
        relationships between nodes in a network, such as logistics networks,
        social networks, or any other system where entities are interconnected.
      </p>

      <div className="mt-10">
        <AccordionMain />
      </div>
      <div className="mt-10">
        <Example/>
      </div>
      <div className="space-y-10">
        <UserGraphGeneration/>
      </div>
    </>
  );
}
