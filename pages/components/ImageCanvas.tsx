import React from "react";
import { Image, useImage, SkImage } from "@shopify/react-native-skia";

export interface MediaImage {
    image: SkImage;
    x: number;
    y: number;
    width: number;
    height: number;
}

export const ImageCanvas: React.FC<{images: MediaImage[]}> = ({images}) => {
  return (
    <>
        {images.map((image, index) => {
            return (
                <Image 
                    key={index}
                    image={image.image}
                    x={image.x}
                    y={image.y}
                    width={image.width}
                    height={image.height}
                />
            );
        })}
    </>
  )
};