"use client";

import { Button } from "./ui/button";

type GenerateExampleButtonProps = {
  label: string;
  onGenerate: () => void;
};

export default function GenerateExampleButton({
  onGenerate,
  label,
}: GenerateExampleButtonProps) {
  return <Button onClick={onGenerate}>{label}</Button>;
}
