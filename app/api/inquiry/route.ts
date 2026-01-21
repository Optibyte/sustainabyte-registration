import { NextResponse } from "next/server";

interface ConsultationData {
  name: string;
  company: string;
  email: string;
  phone: string;
  buildingType: string;
  challenges: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ConsultationData;

    // Validate required fields
    if (
      !data.name ||
      !data.company ||
      !data.email ||
      !data.phone ||
      !data.buildingType ||
      !data.challenges
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log the consultation request
    console.log("✓ Consultation request received:", {
      name: data.name,
      company: data.company,
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    // Return success immediately without any async operations
    return NextResponse.json({ ok: true });
  } catch (e) {
    const error = e as any;
    console.error("Consultation error:", error?.message || error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

