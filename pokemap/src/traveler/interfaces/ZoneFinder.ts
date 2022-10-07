import { Point, ZoneDto } from '../dtos'

export type ZoneFinder = (position: Point) => Promise<ZoneDto>
