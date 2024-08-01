"use client";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store/jsonDataStore";
import { jsonDataSchema } from "@/lib/types";
import { useState } from "react";
import { ZodIssue } from "zod";

type ErrorInfo = {
  userMessage: string;
  errors: ZodIssue[];
};

export default function JSONFileUploader() {
  const setJsonData = useStore((state) => state.setJsonData);
  const [error, setError] = useState<ErrorInfo | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setJsonData(null!);
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const result = e.target?.result as string;
        const data = JSON.parse(result);

        // Use safeParse to validate JSON data
        const parsedData = jsonDataSchema.safeParse(data);
        console.log(parsedData);

        if (parsedData.success) {
          setJsonData(parsedData.data);
        } else {
          const zodErrors: ZodIssue[] = parsedData.error.errors;
          console.error("Invalid JSON:", zodErrors);

          setError({
            userMessage:
              "Unfortunately, the provided JSON object is not valid.",
            errors: zodErrors,
          });
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setError({
          userMessage:
            "Invalid JSON file: Please check the structure and try again.",
          errors: [],
        });
      } finally {
        if (!file) {
          setError(null);
        }
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="max-w-[400px] mx-auto mt-10"
      />

      {error && (
        <div
          className="bg-red-100 border border-red-400 max-w-[400px] mx-auto mt-5 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.userMessage}</span>
          <ul className="mt-2">
            {error.errors.map((issue, index) => (
              <li key={index} className="text-sm">
                <strong>Path:</strong> {issue.path.join(".")} -{" "}
                <strong>Message:</strong> {issue.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
