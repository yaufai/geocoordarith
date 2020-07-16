import { DimensionedValue } from "unitconv/build/Dimension";
import { GeoCoordinated } from "../GeoCoordinated";
import { getDistance } from "../GeoCoords";
import { LENGTH_METER } from "unitconv/build/BaseQuantity/Length";

export function isInOpenBall(expected: GeoCoordinated, actual: GeoCoordinated, radius: DimensionedValue): boolean {
    let distance = getDistance(expected, actual, LENGTH_METER)
    return distance < radius.getValueIn(LENGTH_METER)
}