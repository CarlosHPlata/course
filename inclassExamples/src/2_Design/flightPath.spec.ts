import { findFlightPath } from "./index";

describe("Flight Pathfinding Unit Tests", () => {

  test("should find all paths from JFK to MID, cheapest first", () => {
    const results = findFlightPath("JFK", "MID");
    expect(results.length).toBeGreaterThan(0);
    // JFK -> MIA -> MEX -> MID = 200 + 150 + 120 = 470
    expect(results[0].path).toEqual(["JFK", "MIA", "MEX", "MID"]);
    expect(results[0].totalPrice).toBe(470);
  });

  test("should find the cheapest path from JFK to LAX", () => {
    const results = findFlightPath("JFK", "LAX");
    expect(results.length).toBeGreaterThan(0);
    // JFK -> ORD -> LAX = 150 + 200 = 350
    expect(results[0].path).toEqual(["JFK", "ORD", "LAX"]);
    expect(results[0].totalPrice).toBe(350);
  });

  test("should find the cheapest path from MIA to MID", () => {
    const results = findFlightPath("MIA", "MID");
    expect(results.length).toBeGreaterThan(0);
    // MIA -> MEX -> MID = 150 + 120 = 270
    expect(results[0].path).toEqual(["MIA", "MEX", "MID"]);
    expect(results[0].totalPrice).toBe(270);
  });

  test("should return empty array when no path exists (JFK to LEX)", () => {
    const results = findFlightPath("JFK", "LEX");
    expect(results).toHaveLength(0);
  });

  test("should return destination immediately for direct flights (MIA to MID direct choice)", () => {
    const results = findFlightPath("MIA", "MID");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].totalPrice).toBeLessThanOrEqual(350);
  });
});
