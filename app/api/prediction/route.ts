import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { birthDate, birthTime, birthPlace } = await req.json();
    console.log("Calling prediction service...");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chart/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateOfBirth: birthDate,
          timeOfBirth: birthTime,
          placeOfBirth: birthPlace,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw Error(`External service error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Prediction service response:", data);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error("Error calling prediction service:", error);
    return NextResponse.json(
      { message: error.message || "Error calling prediction service" },
      { status: 500 }
    );
  }
}
