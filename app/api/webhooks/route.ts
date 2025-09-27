import { NextResponse } from "next/server";

export async function POST() {
	// Handle webhook events here
	return NextResponse.json({ received: true });
}
