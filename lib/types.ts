import { z } from "zod";

// Define Zod schema for mNode
const mNodeSchema = z.object({
  Key: z.number(),
  LocationType: z.number(),
  SmartLocationType: z.number().nullable(),
  Store: z.string(),
  StorageLocation: z.string(),
  Height: z.number(),
  MaxWeight: z.number(),
  DistanceFromGround: z.number(),
  IsOccupied: z.boolean(),
  PossibleContainerTypes: z.array(z.any()), // You can specify a more detailed type if necessary
  SensorStatus: z.any().nullable(), // Specify type if possible
});

// Define Zod schema for CarrierNode
const carrierNodeSchema = z.object({
  Id: z.string(),
  Carrier: z.string(),
});

// Define Zod schema for Edge
const edgeSchema = z.object({
  EdgeId: z.object({
    Item1: z.string(),
    Item2: z.string(),
    Item3: z.string(),
  }),
  SourceNode: z.object({
    Key: z.number().optional(),
    Id: z.string().optional(),
    LocationType: z.number().optional(),
    SmartLocationType: z.number().nullable().optional(),
    Store: z.string().optional(),
    StorageLocation: z.string().optional(),
    Height: z.number().optional(),
    MaxWeight: z.number().optional(),
    DistanceFromGround: z.number().optional(),
    IsOccupied: z.boolean().optional(),
    PossibleContainerTypes: z.array(z.any()).optional(), // You can specify a more detailed type if necessary
    SensorStatus: z.any().nullable().optional(), // Specify type if possible
    Carrier: z.string().optional(),
  }),
  TargetNode: z.object({
    Key: z.number().optional(),
    Id: z.string().optional(),
    LocationType: z.number().optional(),
    SmartLocationType: z.number().nullable().optional(),
    Store: z.string().optional(),
    StorageLocation: z.string().optional(),
    Height: z.number().optional(),
    MaxWeight: z.number().optional(),
    DistanceFromGround: z.number().optional(),
    IsOccupied: z.boolean().optional(),
    PossibleContainerTypes: z.array(z.any()).optional(), // You can specify a more detailed type if necessary
    SensorStatus: z.any().nullable().optional(), // Specify type if possible
    Carrier: z.string().optional(),
  }),
  Carrier: z.object({
    Type: z.number(),
    DisplayName: z.string(),
    Description: z.string().nullable(),
    IsLocked: z.boolean(),
    Id: z.string(),
  }),
  Cost: z.number(),
  TransportType: z.number(),
  TransportActivationLevel: z.number(),
});

// Define Zod schema for JsonData
export const jsonDataSchema = z.object({
  mNodes: z.record(mNodeSchema),
  mCarrierNodes: z.record(carrierNodeSchema),
  mEdges: z.array(edgeSchema),
  EdgesCount: z.number(),
  NodesCount: z.number(),
});

// Infer TypeScript types from Zod schema
export type JsonData = z.infer<typeof jsonDataSchema>;
export type MNode = z.infer<typeof mNodeSchema>;
export type CarrierNode = z.infer<typeof carrierNodeSchema>;
export type Edge = z.infer<typeof edgeSchema>;


// Define custom Node and Edge types for the graph
export type Node = {
  id: string;
  type: string;
  incoming: number;
  outgoing: number;
  [key: string]: any;
  x?: number; // optional
  y?: number; // optional
  fx?: number | null; // for dragging
  fy?: number | null; // for dragging
};

export type GraphEdge = {
  source: Node;
  target: Node;
  id: string; 
};