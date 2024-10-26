import { Skia, Path, Paint, PaintStyle } from "@shopify/react-native-skia";
import React from "react";

const dashEffect = [10, 5]; // Dash length, space length

interface RoundedDashedRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
}

export const RoundedDashedRect = ({
  x,
  y,
  width,
  height,
  r,
}: RoundedDashedRectProps) => {
  const path = Skia.Path.Make();
  const rect = Skia.RRectXY(Skia.XYWHRect(x, y, width, height), r, r);
  path.addRRect(rect);

  const paint = Skia.Paint();
  paint.setColor(Skia.Color("#ffffff50"));
  paint.setStyle(PaintStyle.Stroke); // Set paint style to stroke
  paint.setStrokeWidth(1);
  paint.setPathEffect(Skia.PathEffect.MakeDash(dashEffect, 0)); // Apply dash effect

  return <Path path={path} paint={paint} />;
};
