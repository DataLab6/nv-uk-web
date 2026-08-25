import { handlePqrsRequest } from "@corporativo/site-kit/server/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handlePqrsRequest(request, "la-nieve");
}
