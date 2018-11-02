import { Type } from '@angular/core';

export interface Widget {

  id: string;

  height: number;

  width: number;

  left: number;

  top: number;
}

export interface WidgetDefinition {

  id: string;

  component: Type<any>;

  defaultHeight: number;

  defaultWidth: number;
}
