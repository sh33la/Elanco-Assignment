import { http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { API_END_POINTS } from "../../services/apiEndpoints";
import { countryService } from "../../services/countryService";

const BASE_URL = "http://localhost:3001";

// Mock API responses
const mockServer = setupServer(
  http.get(BASE_URL + API_END_POINTS.COUNTRIES, async ({ request }) => {
    return new Response(
      JSON.stringify([
        { name: "India", countryCode: "IN", flag: "🇮🇳", region: "Asia" },
      ]),
      { status: 200 }
    );
  }),

  http.get(BASE_URL + API_END_POINTS.COUNTRIES + "/IN", async ({ request }) => {
    return new Response(
      JSON.stringify({
        name: "India",
        countryCode: "IN",
        flag: "🇮🇳",
        region: "Asia",
      }),
      { status: 200 }
    );
  }),

  http.get(BASE_URL + API_END_POINTS.REGION + "/Asia", async ({ request }) => {
    return new Response(
      JSON.stringify([{ name: "India", countryCode: "IN" }]),
      {
        status: 200,
      }
    );
  }),

  http.get(BASE_URL + API_END_POINTS.SEARCH, async ({ request }) => {
    return new Response(
      JSON.stringify([{ name: "Japan", countryCode: "JP" }]),
      {
        status: 200,
      }
    );
  })
);

// Start the server before tests run
beforeAll(() => mockServer.listen());

// Reset handlers after each test
afterEach(() => mockServer.resetHandlers());

// Close the server after all tests are done
afterAll(() => mockServer.close());

describe("countryService API calls", () => {
  it("fetches the list of countries", async () => {
    const response = await countryService.getCountriesList();
    expect(response.data).toEqual([
      { name: "India", countryCode: "IN", flag: "🇮🇳", region: "Asia" },
    ]);
  });

  it("fetches country details by code", async () => {
    const response = await countryService.getCountryByCode("IN");
    expect(response.data).toEqual({
      name: "India",
      countryCode: "IN",
      flag: "🇮🇳",
      region: "Asia",
    });
  });

  it("fetches countries by region", async () => {
    const response = await countryService.getCountriesByRegion("Asia");
    expect(response.data).toEqual([{ name: "India", countryCode: "IN" }]);
  });

  it("searches countries by query parameters", async () => {
    const response = await countryService.searchCountries({ name: "Japan" });
    expect(response.data).toEqual([{ name: "Japan", countryCode: "JP" }]);
  });

  it("handles errors correctly", async () => {
    mockServer.use(
      http.get(BASE_URL + API_END_POINTS.COUNTRIES, async ({ request }) => {
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
          }
        );
      })
    );

    try {
      await countryService.getCountriesList();
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.data).toEqual({ error: "Internal Server Error" });
    }
  });
});
