import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionMain() {
  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-4 bg-white p-7 rounded-3xl  shadow-sm"
    >
      <AccordionItem value="key-features">
        <AccordionTrigger className="font-medium text-xl">
          Key Features
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-4">
            <ul className="list-disc list-inside flex flex-col gap-2 text-lg text-gray-600 mb-4">
              <li>
                <strong>JSON File Uploader:</strong> Enables users to upload a
                JSON file containing data that defines nodes, carriers, and
                edges. The uploaded file is parsed and validated to ensure it
                meets the expected data schema.
              </li>
              <li>
                <strong>Validation:</strong> The app uses the Zod library to
                validate the uploaded JSON structure. If the file is invalid,
                users receive an error message detailing the issues with the
                data.
              </li>
              <li>
                <strong>Error Handling:</strong> Detailed error messages are
                provided to help users correct any issues with their data,
                ensuring that only valid data is used for visualization.
              </li>
              <li>
                <strong>Graph Visualizer:</strong> The GraphVisualiser component
                takes the validated JSON data and generates an interactive graph
                using the D3.js library. Nodes and carriers are represented as
                circles, with links between them visualized as arrows.
              </li>
              <li>
                <strong>Interactivity:</strong> Users can hover over nodes and
                links to view additional information such as node ID, type, and
                the number of incoming and outgoing connections. This
                interactivity helps users explore and understand the network
                structure more intuitively.
              </li>
              <li>
                <strong>Force-Directed Layout:</strong> The graph uses a
                force-directed layout, which dynamically positions nodes based
                on their connections, providing a clear and organized view of
                the network.
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* How It Works Accordion */}
      <AccordionItem value="how-it-works">
        <AccordionTrigger className="font-medium text-xl">
          How It Works
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-4">
          <ul className="list-disc list-inside flex flex-col gap-2 text-lg text-gray-600 mb-4">
              <li>
                <strong>Data Input:</strong> Users start by uploading a JSON
                file using the JSONFileUploader component. The file should
                contain three main sections: mNodes, mCarrierNodes, and mEdges,
                detailing nodes, carriers, and connections, respectively.
              </li>
              <li>
                <strong>Data Validation:</strong> The uploaded file is parsed
                and validated against a predefined schema to ensure that it
                contains all necessary fields and adheres to expected data
                types.
              </li>
              <li>
                <strong>Graph Rendering:</strong> Once the data is validated,
                the GraphVisualiser component renders the network graph. Nodes
                and carriers are displayed as circles, with arrows indicating
                the direction of connections between them.
              </li>
              <li>
                <strong>User Interaction:</strong> Users can interact with the
                graph by hovering over nodes and links to see additional
                information. This interaction helps users gain insights into the
                structure and dynamics of the network.
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}
