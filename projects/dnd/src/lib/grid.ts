import { Widget, WidgetDefinition } from './widget-lib';
import { Observable } from 'rxjs';

export interface ChGridConfig<T> {

  grid: T;

  columns: number;

  rows: number;
}

export abstract class ChGrid {
  abstract readonly widgets$: Observable<Widget[]>;

  abstract clear();

  abstract addWidget(widget: WidgetDefinition);

  abstract enable();

  abstract disable();
}
