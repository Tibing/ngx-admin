import { Inject, Injectable } from '@angular/core';

import { Widget } from './widget-lib';
import { WIDGET_REGISTRY } from './widgets-lib/widgets-lib.module';


@Injectable({ providedIn: 'root' })
export class ChWidgetLibService {

  constructor(@Inject(WIDGET_REGISTRY) protected widgets: Widget[]) {
  }

  get(id: string): Widget {
    const widget = this.widgets.find(({ id: widgetId }) => id === widgetId);

    if (!widget) {
      throw Error(`No widget with id: ${id} found in widget library.`);
    }

    return widget;
  }

  getAll(): Widget[] {
    return this.widgets;
  }
}
