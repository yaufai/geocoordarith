import { GeoCoordinated } from "./GeoCoordinated"
import { SimpleLocation } from "./SimpleLocation"
import { isNullOrUndefined } from "util"
import { LENGTH_METER, instantiateLength, LENGTH_KILOMETER }   from "unitconv/build/BaseQuantity/Length"
import { DimensionedValue } from "unitconv/build/Dimension"
import { EARTH_RADIUS_DIM } from "./Constants"
import { instantiateAngle, ANGLE_RAD } from "unitconv/build/BaseQuantity/Angle"
import { CartesianCoordinate } from "./CartesianCoordinate"

/**
 * 地球を完全な球体と仮定して、与えられた点のデカルト座標を求める。
 * Represent in Cartesian coordinates a point on the earth, assuming it is a perfect sphere.
 * @param x 
 * @param radius 
 * @param unitName 
 */
function convertToCartesianCoordinate(x: GeoCoordinated, radius: DimensionedValue, unitName?: string): CartesianCoordinate {
    let unit = isNullOrUndefined(unitName) ? LENGTH_KILOMETER : unitName
    let earthRadius = radius.getValueIn(unit)
    return new CartesianCoordinate(
        instantiateLength(earthRadius * Math.cos(x.getLatitudeInRad()) * Math.cos(x.getLongitudeInRad()), unit),
        instantiateLength(earthRadius * Math.cos(x.getLatitudeInRad()) * Math.sin(x.getLongitudeInRad()), unit),
        instantiateLength(earthRadius * Math.sin(x.getLatitudeInRad()), unit)
    )
}

/**
 * 地球を完全な球体と仮定して、二点の球面上の中点を求める。
 * Returns the midpoint between x and y on the earth, assuming it is a perfect sphere.
 * @param x 
 * @param y 
 */
export function getMidpoint(x: GeoCoordinated, y: GeoCoordinated): SimpleLocation {
    let unit   = LENGTH_KILOMETER
    let cart_x = convertToCartesianCoordinate(x, EARTH_RADIUS_DIM, unit)
    let cart_y = convertToCartesianCoordinate(y, EARTH_RADIUS_DIM, unit)
    let m      = cart_x.addedBy(cart_y).scaledToLength(EARTH_RADIUS_DIM)

    let lat = Math.asin(m.z.getValueIn(unit)/EARTH_RADIUS_DIM.getValueIn(unit))
    let lng = Math.atan2(m.y.getValueIn(unit), m.x.getValueIn(unit))
    return new SimpleLocation(instantiateAngle(lat, ANGLE_RAD), instantiateAngle(lng, ANGLE_RAD))
}

/**
 * 地球を完全な球体と仮定して球面上の二点間の距離を計算する。
 * Returns the distance between x and y on the earth, assuming it is a perfect sphere.
 * @param x 
 * @param y 
 * @param unitName km, m, cm
 */
export function getDistance(x: GeoCoordinated, y: GeoCoordinated, unitName?: string): number {
    let unit   = isNullOrUndefined(unitName) ? LENGTH_METER : unitName
    let sin = Math.sin(x.getLatitudeInRad()) * Math.sin(y.getLatitudeInRad())
    let cos = Math.cos(x.getLatitudeInRad()) * Math.cos(y.getLatitudeInRad()) * Math.cos(
        x.getLongitudeInRad() - y.getLongitudeInRad()
    )
    return EARTH_RADIUS_DIM.getValueIn(unit) * Math.acos(cos + sin)
}