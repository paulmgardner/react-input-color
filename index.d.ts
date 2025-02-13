import { Component } from 'react';

export class Color {
  h: number;
  s: number;
  v: number;
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
  rgba: string;
}

export interface InputColorProps {
  hexId: string;
  initialValue: string;
  placement?: string;
  onChange?(color: Color): void;
  disabled?: boolean;
}

export default function InputColor(props: InputColorProps);
