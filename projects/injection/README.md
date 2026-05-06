# SkyScanner

A flight route search application that finds all valid connections between two airports and returns them ranked by cost-effectiveness.

Given an origin and destination airport code, the system explores possible multi-leg journeys — respecting layover time constraints — and surfaces the cheapest options.

## Architecture

```mermaid
graph LR
                        _________________________
  SearchController --> | PathFinder --> interfaz | <-- RoutesStore
```

| Layer | Responsibility |
|---|---|
| `SearchController` | Entry point for search requests; sorts and returns ranked results |
| `PathFinder` | Explores and validates all possible routes between two airports |
| `RoutesStore` | Holds airport and flight data |
