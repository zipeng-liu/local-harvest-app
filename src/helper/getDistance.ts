export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371; // Earth's radius in km

    // switch dLat, dLng to radian. dLat and dLng are difference of Lat and Lng
    const dLat = (lat2 - lat1) * Math.PI/180;
    const dLng = (lng2 - lng1) * Math.PI/180;

    // Haversine formula: a = sin^2(dLat/2) + cos(lat1)cos(lat2) + sin^2(dLng/2)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    // d = 2R arcsin(sqrt root of a) = c * R
    // c = 2 arcsin(sqrt root of a) = arctan2(sqrt root of a, sqrt root of (1-a))
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

