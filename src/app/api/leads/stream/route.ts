import { subscribeLeads, Lead } from "@/lib/leads-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connected event
      controller.enqueue(encoder.encode(`event: connected\ndata: ${JSON.stringify({ status: "connected", time: new Date().toISOString() })}\n\n`));

      // Subscribe to leads-store broadcasts
      const unsubscribe = subscribeLeads((lead: Lead) => {
        try {
          const payload = `event: lead\ndata: ${JSON.stringify(lead)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch (e) {
          console.error("SSE stream enqueue error:", e);
        }
      });

      // Periodic heartbeat ping every 15s
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`event: ping\ndata: ${Date.now()}\n\n`));
        } catch {
          clearInterval(interval);
          unsubscribe();
        }
      }, 15000);

      // Clean up when client disconnects
      return () => {
        clearInterval(interval);
        unsubscribe();
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
