import type { NextRequest } from "next/server"

// This handles all HTTP methods to the /post-handler path
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.text()

    // Check if this is an inject command
    if (body === "inject") {
      console.log("Injection request received")

      // Here you would implement your actual injection logic
      // For now, we'll just return a success message
      return new Response(
        JSON.stringify({
          success: true,
          message: "Injection successful",
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            // Add CORS headers to allow external applications to access this endpoint
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      )
    }

    // Otherwise, treat it as code execution
    console.log("Code execution request received")
    console.log("Code to execute:", body)

    // Here you would implement your actual code execution logic
    // For now, we'll just return a success message with the code length
    return new Response(
      JSON.stringify({
        success: true,
        message: `Executed ${body.length} characters of code successfully`,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  } catch (error) {
    console.error("Error in POST handler:", error)

    // Return an error response
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

