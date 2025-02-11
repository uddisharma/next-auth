"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Calendar, HelpCircle, CheckCircle } from "lucide-react";
import { Report } from "@prisma/client";

export default function ReportDetails({ report }: { report: Report }) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">
                Report Details
              </CardTitle>
              <CardDescription className="mt-1">
                Detailed view of the report
              </CardDescription>
            </div>
            {/* <div className="flex justify-end space-x-4">
              <Button variant="outline">Export Report</Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Date:</span>
                {new Date(report.createdAt).toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Duration:</span>{" "}
                {(
                  (report.endTime.getTime() - report.startTime.getTime()) /
                  (1000 * 60)
                ).toFixed(0)}{" "}
                minutes
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Session ID:</span>{" "}
                {report.sessionId}
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Status:</span>{" "}
                <Badge variant="sucess">Completed</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Questions and Answers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {report.questions.map((qa, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  {
                    //@ts-ignore
                    qa.question
                  }
                </AccordionTrigger>
                <AccordionContent>
                  {
                    //@ts-ignore
                    qa.answer
                  }
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      {
        //@ts-ignore
        report?.recommendation?.summary && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Summary:{" "}
                {
                  // @ts-ignore
                  report?.recommendation?.summary
                }
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Strengths:</h4>
                  <ul className="list-disc list-inside">
                    {//@ts-ignore
                    report?.recommendation?.strengths?.map(
                      //@ts-ignore
                      (strength, index) => <li key={index}>{strength}</li>,
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Areas for Improvement:</h4>
                  <ul className="list-disc list-inside">
                    {//@ts-ignore
                    report?.recommendation?.areasForImprovement?.map(
                      //@ts-ignore
                      (area, index) => <li key={index}>{area}</li>,
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      }
    </div>
  );
}
