import { Inject, Injectable } from '@angular/core';

import { WidgetDefinition } from './widget-lib';
import { WIDGET_REGISTRY } from './widgets-lib/widgets-lib.module';


@Injectable({ providedIn: 'root' })
export class ChWidgetLibService {

  constructor(@Inject(WIDGET_REGISTRY) protected widgets: WidgetDefinition[]) {
    this.checkWidgetLibProvided();
  }

  get(id: string): WidgetDefinition {
    const widget = this.widgets.find(({ id: widgetId }) => id === widgetId);

    if (!widget) {
      throw Error(`No widget with id: ${id} found in widget library.`);
    }

    return widget;
  }

  getAll(): WidgetDefinition[] {
    return this.widgets;
  }

  protected checkWidgetLibProvided() {
    if (!this.widgets) {
      throw Error('No widget library provided.');
    }

    if (!this.widgets.length) {
      throw Error('No widgets in provided widget library.');
    }
  }
}
