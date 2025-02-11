"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { ExportType } from "@/schemas/types";

const ExportButton = ({ type }: { type: ExportType }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadAndExport = async () => {
    try {
      setLoading(true);
      const data = await fetch(`/api/export/${type}`);
      const resData = await data.json();
      const csvConfig = mkConfig({
        fieldSeparator: ",",
        quoteStrings: false,
        decimalSeparator: ".",
        showTitle: true,
        title: `${type}s`,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      });

      if (type == "report") {
        const formattedData = resData.map((e: any) => ({
          ...e,
          questions: e.questions
            .map((q: any) => `${q.question}: ${q.answer}`)
            .join(", "),
          recommendation: e.recommendation?.message,
          startTime: e.startTime?.split("T")[0],
          endTime: e.endTime?.split("T")[0],
          createdAt: e.createdAt?.split("T")[0],
          updatedAt: e.updatedAt?.split("T")[0],
        }));
        const csv = generateCsv(csvConfig)(formattedData);
        return download(csvConfig)(csv);
      }

      const formattedBlogs = resData.map((e: any) => ({
        ...e,
        createdAt: e.createdAt?.split("T")[0],
        updatedAt: e.updatedAt?.split("T")[0],
      }));
      const csv = generateCsv(csvConfig)(formattedBlogs);
      download(csvConfig)(csv);
    } catch (error) {
      console.log(error);
      toast.error("Failed to export data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownloadAndExport}
      disabled={loading}
    >
      {loading ? "Exporting..." : "Export Data"}
    </Button>
  );
};

export default ExportButton;
