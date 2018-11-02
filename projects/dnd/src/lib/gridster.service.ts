import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { ChGridComponent } from './grid.component';
import { Widget, WidgetDefinition } from './widget-lib';
import { ChGrid } from './grid';
import { ChWidgetLibService } from './widget-lib.service';

export class NgxGridConfig {
  widgetMarginX: number = 32;
  widgetMarginY: number = 32;
  gridColumnHeight: number = 32;
  gridColumnWidth: number = 32;
  gridElement: HTMLElement;

  constructor(config: Partial<NgxGridConfig>) {
    Object.assign(this, config);
  }
}

@Injectable()
export class ChGridsterService extends ChGrid {

  protected grid;
  protected gridComponent: ChGridComponent;
  protected widgets: Widget[] = [];

  constructor(protected widgetLib: ChWidgetLibService,
              protected cfr: ComponentFactoryResolver,
  ) {
    super();
  }

  setGridComponent(gridComponent: ChGridComponent) {
    this.gridComponent = gridComponent;
  }

  createGrid(config: NgxGridConfig) {
    this.grid = $(config.gridElement)
      .gridster({
        widget_base_dimensions: [config.gridColumnHeight, config.gridColumnWidth],
        widget_margins: [config.widgetMarginX, config.widgetMarginY],
        draggable: {
          stop: this.serialize.bind(this),
        },
        resize: {
          enabled: true,
          stop: this.serialize.bind(this),
        },
        widget_selector: '[ngxWidget]',
      })
      .data('gridster');
    this.widgets = this.load() || [];
    this.widgets.forEach((widget: Widget) => {
      this.renderWidget(widget);
    });
  }

  clear() {
    localStorage.clear();
    this.grid.remove_all_widgets();
  }

  addWidget(widget: WidgetDefinition) {
    const w = {
      id: widget.id,
      height: widget.defaultHeight,
      width: widget.defaultWidth,
      left: 0,
      top: 0,
    };
    this.widgets.push(w);
    this.renderWidget(w);
    this.serialize();
  }

  renderWidget(widget: Widget) {
    const factory = this.cfr.resolveComponentFactory(this.widgetLib.get(widget.id).component);
    const componentRef = this.gridComponent.anchor.createComponent(factory);
    componentRef.location.nativeElement.setAttribute('ngxWidget', '');
    this.grid.add_widget(
      componentRef.location.nativeElement,
      widget.width,
      widget.height,
      widget.left,
      widget.top,
    );
  }

  enable() {
    this.grid.enable();
    this.grid.enable_resize();
  }

  disable() {
    this.grid.disable();
    this.grid.disable_resize();
  }

  load(): Widget[] {
    return JSON.parse(localStorage.getItem('widgets'));
  }

  protected serialize() {
    const serialized = this.grid.serialize()
      .map(this.cast.bind(this));
    this.persist(serialized);
  }

  protected persist(widgetsData: Widget) {
    localStorage.setItem('widgets', JSON.stringify(widgetsData));
  }

  // TODO get widget descriptor somehow
  protected cast({ col, row, size_x, size_y }, i): Widget {
    return { top: row, left: col, width: size_x, height: size_y, id: this.widgets[i].id };
  }
}
