"use client"

import * as d3 from "d3";
import { useEffect, useState } from "react";

const fetchData = async (url: string) => {
    const promise = await fetch(url);
    const data = await promise.text();
    const csvParsedData = d3.csvParse(data);

    const summaryMessage = `This data has ${csvParsedData.length} rows and ${
      csvParsedData.columns.length
    } columns. Total size is approximately ${(data.length / 1024).toFixed(
      2
    )} kb.`;

    return {summaryMessage, csvParsedData}
  };

export default function GetColors() {
    const [data, setData] = useState<{ summaryMessage: string; csvParsedData: d3.DSVRowArray<string> } | null>(null);

 console.log(data);
 useEffect(() => {
    const getData = async () => {
      const result = await fetchData("https://gist.githubusercontent.com/KilJae69/94a54c8975626c9a2e17078f0c015e54/raw/cssNamedColors.csv");
      setData(result);
    };
    
    getData();
  }, [setData]);

 
//   const url =
//     "https://gist.githubusercontent.com/KilJae69/94a54c8975626c9a2e17078f0c015e54/raw/cssNamedColors.csv";

//   const promise = await fetch(url);
//   const data = await promise.text();
//   const csvParsedData = d3.csvParse(data);

//   const summaryMessage = `This data has ${csvParsedData.length} rows and ${
//     csvParsedData.columns.length
//   } columns. Total size is approximately ${(data.length / 1024).toFixed(
//     2
//   )} kb.`;

  return (
    <div>
      <p></p>
    </div>
  );
}
