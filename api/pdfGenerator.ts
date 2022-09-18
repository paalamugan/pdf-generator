import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generatePDFContent } from "../utils";

const handleResponseError = (message: string, res: VercelResponse, statusCode: number = 500) => {
  res.status(statusCode).send({ error: message });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;
  const { payload } = req.body || {};

  if (method !== "POST") {
    return handleResponseError("please use 'POST' method to get a response!", res, 405);
  }

  if (typeof payload !== "string") {
    return handleResponseError('body "payload" must be a string!', res, 400);
  }

  try {
    const content = await generatePDFContent(payload);
    res.send(content);
  } catch (error) {
    return handleResponseError(error.message, res);
  }
}
