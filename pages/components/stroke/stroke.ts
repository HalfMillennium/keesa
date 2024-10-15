export enum StrokeTypes {
    THIN = "Thin",
    MEDIUM = "Medium",
    HEAVY = "Heavy",
    EXTRA_HEAVY = "Extra Heavy",
}

export const STROKE_WIDTHS: Record<StrokeTypes, number> = {
    [StrokeTypes.THIN]: 5,
    [StrokeTypes.MEDIUM]: 10,
    [StrokeTypes.HEAVY]: 15,
    [StrokeTypes.EXTRA_HEAVY]: 20,
}

export enum StrokeStyles {
    SOLID = "Solid",
    DASHED = "Dashed",
    DOTTED = "Dotted",
    GRADIENT = "Gradient"
}