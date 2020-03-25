import { instantiateLength, LENGTH_KILOMETER } from "unitconv/build/BaseQuantity/Length"

export const EARTH_RADIUS_VALUE = 6378.137
export const EARTH_RADIUS_DIM   = instantiateLength(EARTH_RADIUS_VALUE, LENGTH_KILOMETER)