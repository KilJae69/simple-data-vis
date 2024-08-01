import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { JsonData, Node, GraphEdge  } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type TransformedData = {
  nodes: Node[];
  links: GraphEdge[];
};

export function transformJsonData(jsonData: JsonData):TransformedData {
  // Transform storage nodes
  

  const storageNodes: Node[] = Object.values(jsonData.mNodes).map((node) => ({
    id: node.Key.toString(),
    type: "mNode",
    incoming: 0,
    outgoing: 0,
    ...node,
  }));

  // Transform carrier nodes
  const carrierNodes: Node[] = Object.values(jsonData.mCarrierNodes).map(
    (node) => ({
      id: node.Id.toString(),
      type: "carrierNode",
      incoming: 0,
      outgoing: 0,
      ...node,
    })
  );

  // Combine nodes
  const nodes: Node[] = [...storageNodes, ...carrierNodes];

  // Transform edges
  const links: GraphEdge[] = jsonData.mEdges.map((edge, index) => {
    const sourceNode = nodes.find(
      (n) => n.id === (edge.SourceNode.Id || edge.SourceNode.Key?.toString())
    ) as Node;
    const targetNode = nodes.find(
      (n) => n.id === (edge.TargetNode.Id || edge.TargetNode.Key?.toString())
    ) as Node;

    if (sourceNode) sourceNode.outgoing += 1;
    if (targetNode) targetNode.incoming += 1;

    return {
      source: sourceNode,
      target: targetNode,
      id: `link${index}`,
    };
  });

  return { nodes, links };
}