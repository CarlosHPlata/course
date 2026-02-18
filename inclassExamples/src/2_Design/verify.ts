import { findFlightPath } from "./index";

console.log("--- Test 1: JFK to MID (Connecting Flights) ---");
findFlightPath("JFK", "MID");

console.log("\n--- Test 2: JFK to LEX (No Path) ---");
findFlightPath("JFK", "LEX");

console.log("\n--- Test 3: MIA to MID (Direct Flight) ---");
findFlightPath("MIA", "MID");

console.log("\n--- Test 4: JFK to LAX (Multiple Options) ---");
findFlightPath("JFK", "LAX");
