import { http, HttpResponse, type RequestHandler } from "msw";
import { v4 as uuidv4 } from "uuid";

const memo1Id = uuidv4();
const memo2Id = uuidv4();

export const handlers = [
  http.get("/api/memo", () => {
    console.log("Mocked handler for /api/memo is being called");
    return HttpResponse.json({
      memos: [
        {
          id: memo1Id,
          title: "メモ1",
          createdAt: new Date("2022-01-01T00:00:00.000Z"),
          updatedAt: new Date("2022-01-01T00:00:00.000Z"),
        },
        {
          id: memo2Id,
          title: "メモ2",
          createdAt: new Date("2022-01-01T00:00:00.000Z"),
          updatedAt: new Date("2022-01-01T00:00:00.000Z"),
        },
      ],
    });
  }),
];
