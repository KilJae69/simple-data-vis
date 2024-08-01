"use client";


import {  JsonData, Node } from "@/lib/types";
import { transformJsonData } from "@/lib/utils";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

// Define Types for nodes and edges



// Configuration object for settings
const config = {
  width: 800,
  height: 600,
  nodeRadius: 20,
  nodeColors: {
    mNode: "#2563eb",
    carrierNode: "#e11d48",
  },
  link: {
    stroke: "#999",
    markerWidth: 10,
    markerHeight: 10,
    strokeWidth: 2, // Added for easier hover detection
  },
  force: {
    charge: -300,
    collide: 20,
    linkDistance: 150,
  },
  tooltip: {
    background: "#fff",
    border: "1px solid #ccc",
    padding: "5px",
    borderRadius: "5px",
  },
};

type GraphVisualiserProps = {
  jsonData: JsonData | null;
};

export default function GraphVisualiser({ jsonData }: GraphVisualiserProps) {

  const svgRef = useRef<SVGSVGElement>(null);
  
  const { nodes, links } = jsonData ? transformJsonData(jsonData) : { nodes: [], links: [] };
  

  useEffect(() => {
    if (!nodes || !links || !svgRef.current) return;

    const { width, height, nodeColors, force } = config;

    const svg = d3.select(svgRef.current);

    // Define arrow markers
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", config.link.markerWidth)
      .attr("markerHeight", config.link.markerHeight)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10,0 L 0,5")
      .attr("fill", config.link.stroke)
      .style("stroke", "none");

    // Create a tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", config.tooltip.background)
      .style("border", config.tooltip.border)
      .style("padding", config.tooltip.padding)
      .style("border-radius", config.tooltip.borderRadius)
      .style("pointer-events", "none")
      .style("opacity", 0);

   

    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(force.linkDistance)
      )
      .force("charge", d3.forceManyBody().strength(force.charge))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(force.collide))
      .on("tick", ticked);

    // Define drag behavior
    const drag = d3
      .drag<SVGCircleElement, Node>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Create links SVG
    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link cursor-pointer")
      .attr("stroke", config.link.stroke)
      .attr("stroke-width", config.link.strokeWidth) // Add stroke width for easier hover detection
      .attr("fill", "none")
      .attr("marker-end", "url(#arrowhead)") // Add arrowhead marker to the end of the link
      .on("mouseover", (event, d) => {
        // @ts-ignore
        const sourceId = `${d.source.id}-${d.source.type}`;
        // @ts-ignore
        const targetId = `${d.target.id}-${d.target.type}`;

        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Source: ${sourceId}<br>Target: ${targetId}`)
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Create nodes SVG
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node cursor-pointer")
      .attr("r", config.nodeRadius)
      .attr("fill", (d: Node) =>
        d.type === "mNode" ? nodeColors.mNode : nodeColors.carrierNode
      )
      .call(drag)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `ID: ${d.id}<br>Type: ${d.type}<br>Incoming Links: ${d.incoming}<br>Outgoing Links: ${d.outgoing}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

      function ticked() {
        link.attr("d", (d: any) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dr = Math.sqrt(dx * dx + dy * dy) / 2; // Straight lines
      
          // Calculate the position of the arrow tip
          const angle = Math.atan2(dy, dx);
      
          // Clamp source and target positions to keep links within SVG boundaries
          const sourceX = Math.max(
            config.nodeRadius,
            Math.min(width - config.nodeRadius, d.source.x + Math.cos(angle) * config.nodeRadius)
          );
          const sourceY = Math.max(
            config.nodeRadius,
            Math.min(height - config.nodeRadius, d.source.y + Math.sin(angle) * config.nodeRadius)
          );
          const targetX = Math.max(
            config.nodeRadius,
            Math.min(width - config.nodeRadius, d.target.x - Math.cos(angle) * config.nodeRadius)
          );
          const targetY = Math.max(
            config.nodeRadius,
            Math.min(height - config.nodeRadius, d.target.y - Math.sin(angle) * config.nodeRadius)
          );
      
          return `M${sourceX},${sourceY}A${dr},${dr} 0 0,1 ${targetX},${targetY}`;
        });
      
        node
          .attr("cx", (d: any) =>
            Math.max(config.nodeRadius, Math.min(width - config.nodeRadius, d.x))
          )
          .attr("cy", (d: any) =>
            Math.max(config.nodeRadius, Math.min(height - config.nodeRadius, d.y))
          );
      }
      
  }, [nodes,links]);

  if (!jsonData)
    return (
      <div className="w-full mx-auto text-center">
        <p className="text-lg font-semibold">Please provide valid JSON file based on the structure in example above</p>
      </div>
    );

  return (
    <div className="bg-rose-100 max-w-[1000px] mx-auto">
      <svg
        className="bg-slate-100 w-full mx-auto"
        ref={svgRef}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    </div>
  );
}
