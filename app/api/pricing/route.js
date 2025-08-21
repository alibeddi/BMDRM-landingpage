export async function GET() {
   
   

  // Check that required environment variables exist
  if (!process.env.PRICING_API_URL || !process.env.ADMIN_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Missing PRICING_API_URL or ADMIN_TOKEN in environment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const response = await fetch(process.env.PRICING_API_URL, {
      headers: {
        "Content-Type": "application/json",
        "Admin-Token": process.env.ADMIN_TOKEN,
      },
    });
 
    const text = await response.text();
  

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // Return a readable error if API does not return JSON
      return new Response(
        JSON.stringify({
          error: "Invalid JSON from external API",
          rawResponse: text.slice(0, 500), // prevent huge logs
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the parsed data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(
      JSON.stringify({ error: "Server error fetching pricing", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
