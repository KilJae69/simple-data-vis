import { useMemo } from "react";
import { JsonData } from "@/lib/types";

type SummaryProps = {
  jsonData: JsonData | null;
};

const Summary = ({ jsonData }: SummaryProps) => {
  const summaryData = useMemo(() => {
    if (!jsonData) return null;

    // Calculate basic counts
    const totalNodes = Object.keys(jsonData.mNodes).length + Object.keys(jsonData.mCarrierNodes).length;
    const totalEdges = jsonData.mEdges.length;
    const mNodeCount = Object.keys(jsonData.mNodes).length;
    const carrierNodeCount = Object.keys(jsonData.mCarrierNodes).length;

    // Function to get the degree of a node
    const getNodeDegree = (nodeId: string | number, isCarrier: boolean = false) => {
      return jsonData.mEdges.filter((edge) => {
        if (isCarrier) {
          return (
            edge.SourceNode.Id === nodeId || edge.TargetNode.Id === nodeId
          );
        } else {
          return (
            edge.SourceNode.Key === nodeId || edge.TargetNode.Key === nodeId
          );
        }
      }).length;
    };

    // Initialize least and most connected nodes
    let leastConnectedMNode = { id: "", degree: Infinity };
    let leastConnectedCarrier = { id: "", degree: Infinity };
    let mostConnectedMNode = { id: "", degree: 0 };
    let mostConnectedCarrier = { id: "", degree: 0 };

    // Calculate degrees for each mNode
    Object.values(jsonData.mNodes).forEach((node) => {
      const degree = getNodeDegree(node.Key);
      if (degree < leastConnectedMNode.degree) {
        leastConnectedMNode = { id: node.Key.toString(), degree };
      }
      if (degree > mostConnectedMNode.degree) {
        mostConnectedMNode = { id: node.Key.toString(), degree };
      }
    });

    // Calculate degrees for each carrierNode
    Object.values(jsonData.mCarrierNodes).forEach((carrier) => {
      const degree = getNodeDegree(carrier.Id, true);
      if (degree < leastConnectedCarrier.degree) {
        leastConnectedCarrier = { id: carrier.Id, degree };
      }
      if (degree > mostConnectedCarrier.degree) {
        mostConnectedCarrier = { id: carrier.Id, degree };
      }
    });

    return {
      totalNodes,
      mNodeCount,
      carrierNodeCount,
      totalEdges,
      leastConnectedMNode,
      leastConnectedCarrier,
      mostConnectedMNode,
      mostConnectedCarrier,
    };
  }, [jsonData]);

  if (!summaryData) return null;

  return (
    <div className="summary bg-white p-4 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Graph Summary</h2>
      <p><strong>Total Nodes:</strong> {summaryData.totalNodes}</p>
      <p><strong>mNodes:</strong> {summaryData.mNodeCount}</p>
      <p><strong>Carrier Nodes:</strong> {summaryData.carrierNodeCount}</p>
      <p><strong>Total Edges:</strong> {summaryData.totalEdges}</p>
      <h3 className="text-xl font-semibold my-4">Connectivity</h3>
      <p><strong>Least Connected mNode:</strong> {summaryData.leastConnectedMNode.id} (Degree: {summaryData.leastConnectedMNode.degree})</p>
      <p><strong>Least Connected Carrier:</strong> {summaryData.leastConnectedCarrier.id} (Degree: {summaryData.leastConnectedCarrier.degree})</p>
      <p><strong>Most Connected mNode:</strong> {summaryData.mostConnectedMNode.id} (Degree: {summaryData.mostConnectedMNode.degree})</p>
      <p><strong>Most Connected Carrier:</strong> {summaryData.mostConnectedCarrier.id} (Degree: {summaryData.mostConnectedCarrier.degree})</p>
    </div>
  );
};

export default Summary;
