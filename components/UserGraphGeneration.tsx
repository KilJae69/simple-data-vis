"use client";
import { useStore } from "@/lib/store/jsonDataStore";
import GraphVisualiser from "./GraphVisualiser";
import JSONFileUploader from "./JSONFileUploader";
import Summary from "./Summary";

export default function UserGraphGeneration() {
  const { jsonData } = useStore();
  return (
    <div className="space-y-5 mt-10">
        <h2 className="text-3xl font-semibold">Generate your JSON data</h2>
        <p className="text-lg">Import JSON file and try it yourself</p>
      {" "}
      <JSONFileUploader />
      <GraphVisualiser jsonData={jsonData } />
      <Summary jsonData={jsonData}/>
    </div>
  );
}
