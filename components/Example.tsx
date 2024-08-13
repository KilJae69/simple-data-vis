"use client";
import { useState } from "react";
import GenerateExampleButton from "./GenerateExampleButton";
import exampleData from "@/constants/routegraphv3.json";
import GraphVisualiser from "./GraphVisualiser";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

export default function Example() {
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <div>
      <GenerateExampleButton
        label={!isGenerated ? "Generate Example" : "Close Example"}
        onGenerate={() => setIsGenerated((g) => !g)}
      />

      {isGenerated && (
        <div className="flex flex-col w-full mt-10 lg:flex-row">
          <div className="lg:w-1/2">
            <GraphVisualiser jsonData={exampleData} />
          </div>
          <div className="overflow-y-auto flex-1 lg:w-1/2 max-h-[495px]">
            {/* Formated display json object*/}

            <JsonView
              data={exampleData}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
              clickToExpandNode={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
