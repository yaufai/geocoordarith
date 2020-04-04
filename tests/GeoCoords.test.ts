import assert from "assert"
import { getDistance, getMidpoint } from "../src/GeoCoords"
import { createLocation } from "../src/SimpleLocation"
import { LENGTH_KILOMETER } from "unitconv/build/BaseQuantity/Length"

const TokyoStation   = createLocation(35.681540, 139.767209)
const ShibuyaStation = createLocation(35.658217, 139.701614)
const OsakaStation   = createLocation(34.702776, 135.496090)

const ERROR_LIMIT = 10 ** (-5)

describe("GeoCoords", () => {
    describe("getDistance", () => {
        it("Regular case: Inside City", () => {
            let distance = getDistance(TokyoStation, ShibuyaStation, LENGTH_KILOMETER)
            let expected = 6.475361
            let error    = Math.abs(distance - expected) / expected
            assert(error < ERROR_LIMIT)
        })
        it("Regular case: Inter-City", () => {
            let distance = getDistance(TokyoStation, OsakaStation, LENGTH_KILOMETER)
            let expected = 403.503249
            let error    = Math.abs(distance - expected) / expected
            assert(error < ERROR_LIMIT)
        })
    })
    describe("getMidpoint", () => {
        it("Regular case: Inside City", () => {
            let middle  = getMidpoint(TokyoStation, ShibuyaStation)
            let halfDis = 6.475361 / 2
            let error1  = Math.abs(getDistance(TokyoStation  , middle, LENGTH_KILOMETER) - halfDis) / halfDis
            let error2  = Math.abs(getDistance(ShibuyaStation, middle, LENGTH_KILOMETER) - halfDis) / halfDis
            assert(error1 < ERROR_LIMIT && error2 < ERROR_LIMIT)
        })
        it("Regular case: Inter-City", () => {
            let middle  = getMidpoint(TokyoStation, OsakaStation)
            let halfDis = 403.503249 / 2
            let error1  = Math.abs(getDistance(TokyoStation, middle, LENGTH_KILOMETER) - halfDis) / halfDis
            let error2  = Math.abs(getDistance(OsakaStation, middle, LENGTH_KILOMETER) - halfDis) / halfDis
            assert(error1 < ERROR_LIMIT && error2 < ERROR_LIMIT)
        })
    })
})