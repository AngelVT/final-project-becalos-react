export function isValidDescription(description) {
    if (typeof description !== "string") return false;
    const len = description.trim().length;
    return len >= 2 && len <= 250;
}

export function isValidCoordinates(coords) {
    if (!Array.isArray(coords)) return false;
    if (coords.length !== 2) return false;

    const [lon, lat] = coords;
    if (typeof lon !== "number" || typeof lat !== "number") return false;

    if (lon < -180 || lon > 180) return false;
    if (lat < -90 || lat > 90) return false;

    return true;
}