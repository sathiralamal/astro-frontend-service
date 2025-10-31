import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { astroStore } from "@/lib/astro-store";
import { useLoading } from "@/app/LoadingProvider";
import { useToast } from "@/components/ui/use-toast";

export default function BirthForm() {
  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const addToPredictions = astroStore((state: any) => state.addToPredictions);
  const { start, stop } = useLoading();
  const { toast } = useToast();

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitBirthDetails = async () => {
    // Handle form submission logic here
    console.log(
      "Submitting birth details...",
      birthDate,
      birthTime,
      birthPlace
    );
    start();
    try {
      const res = await fetch("/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthDate,
          birthTime,
          birthPlace,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Prediction API error: ${res.status} ${text}`);
      }

      const parsedData = await res.json();
      addToPredictions(parsedData.data.data);
    } catch (err) {
      console.error("Failed to fetch prediction:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to fetch prediction. Please try again.",
      });
    } finally {
      stop();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            When were you born?
          </label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full"
          />
          <Button
            variant="outline"
            onClick={handleNextStep}
            disabled={!birthDate}
            className={`w-full ${
              !birthDate ? "" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <label
            htmlFor="birthTime"
            className="block text-sm font-medium text-gray-700"
          >
            What time were you born?
          </label>
          <Input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full"
          />
          <div className="flex space-x-4">
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="w-full"
            >
              Back
            </Button>
            <Button
              variant="outline"
              onClick={handleNextStep}
              disabled={!birthTime}
              className={`w-full ${
                !birthTime ? "" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <label
            htmlFor="birthPlace"
            className="block text-sm font-medium text-gray-700"
          >
            Where were you born?
          </label>
          <Input
            id="birthPlace"
            type="text"
            placeholder="Enter your birth place"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            className="w-full"
          />
          <div className="flex space-x-4">
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="w-full"
            >
              Back
            </Button>
            <Button
              disabled={!birthPlace}
              variant="outline"
              className={`w-full ${
                !birthPlace ? "" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => submitBirthDetails()}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      {/* Summary of entered information */}
      <div className="mt-8 pt-4 border-t">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Your Birth Details:
        </h3>
        <p className="text-sm text-gray-600">
          {birthDate && <span className="block">Date: {birthDate}</span>}
          {birthTime && <span className="block">Time: {birthTime}</span>}
          {birthPlace && <span className="block">Place: {birthPlace}</span>}
        </p>
      </div>
    </div>
  );
}
