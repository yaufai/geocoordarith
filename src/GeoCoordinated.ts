export interface GeoCoordinated {
    /**
     * 北を正にした緯度を度数法で与える。
     */
    getLatitude : () => number
    /**
     * 東を正にした経度を度数法で与える。
     */
    getLongitude: () => number
    /**
     * 北を正にした緯度を弧度法で与える。
     */
    getLatitudeInRad : () => number
    /**
     * 東を正にした経度を弧度法で与える。
     */
    getLongitudeInRad: () => number
}
