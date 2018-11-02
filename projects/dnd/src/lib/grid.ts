import { WidgetDefinition } from './widget-lib';

export interface ChGridConfig<T> {

  grid: T;

  columns: number;

  rows: number;
}

export abstract class ChGrid {

  abstract clear();

  abstract addWidget(widget: WidgetDefinition);

  abstract enable();

  abstract disable();
}
