export type EleType = HTMLElement;

export type LineWidthType = number;

export type StrokeStyleType = string | CanvasGradient | CanvasPattern;

export type LineJoinType = CanvasLineJoin;

export type Canvas2dType = CanvasRenderingContext2D;

export type CtxType = Canvas2dType | null;

export interface AttrType {
  [key: string]: string | number | boolean;
}

export type LocationType = {
  x: number;
  y: number;
}

export interface OptionsType {
  el: EleType;
  attr?: AttrType;
  lineWidth?: LineWidthType;
  strokeStyle?: StrokeStyleType;
  lineJoin?: LineJoinType
}

export interface RestOptionsType {
  [key: string]: string | number | boolean | AttrType;
}
