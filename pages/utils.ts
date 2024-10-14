import { Skia, SkPath } from "@shopify/react-native-skia";

const smoothPathOnce = (path: SkPath) => {
    const points = [];
    for (let i = 0; i < path.countPoints(); i++) {
        points.push(path.getPoint(i));
    }

    const smoothedPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const Q = { x: 0.75 * p0.x + 0.25 * p1.x, y: 0.75 * p0.y + 0.25 * p1.y };
        const R = { x: 0.25 * p0.x + 0.75 * p1.x, y: 0.25 * p0.y + 0.75 * p1.y };
        smoothedPoints.push(Q, R);
    }

    const smoothedPath = Skia.Path.Make();
    if (smoothedPoints.length > 0) {
        smoothedPath.moveTo(smoothedPoints[0].x, smoothedPoints[0].y);
        for (let i = 1; i < smoothedPoints.length; i++) {
        smoothedPath.lineTo(smoothedPoints[i].x, smoothedPoints[i].y);
        }
    }

    return smoothedPath;
};

export const smoothPath = (path: SkPath, iterations = 3) => {
    let smoothedPath = path;
    for (let i = 0; i < iterations; i++) {
        smoothedPath = smoothPathOnce(smoothedPath);
    }
    return smoothedPath;
}