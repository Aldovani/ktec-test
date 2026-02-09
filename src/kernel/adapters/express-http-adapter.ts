import type { Controller } from "@app/contracts/controller.js";
import type { Request, Response } from "express";

export function expressHttpAdapter(controller: Controller<any, unknown>) {
  return async (request: Request & { userId?: string }, res: Response) => {
    const { body, params, query } = request;

    const response = await controller["execute"]({
      body,
      params,
      queryParams: query,
      userId: request.userId,
    });

    return res.status(response.statusCode).json(response.body);
  };
}
