import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { ChGridComponent } from './grid.component';
import { Widget } from './widget-lib';
import { ChGrid } from './grid';
import { ChWidgetLibService } from './widget-lib.service';

export class NgxWidgetBoundingRect {
  top?: number;
  left?: number;
  height?: number;
  width?: number;
  widget: string;
}

export class NgxGridConfig {
  widgetMarginX: number = 32;
  widgetMarginY: number = 32;
  gridColumnHeight: number = 140;
  gridColumnWidth: number = 140;
  gridElement: HTMLElement;

  constructor(config: Partial<NgxGridConfig>) {
    Object.assign(this, config);
  }
}

@Injectable()
export class ChGridsterService extends ChGrid {

  protected grid;
  protected gridComponent: ChGridComponent;
  protected widgets: NgxWidgetBoundingRect[] = [];

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
    this.widgets.forEach((widget: NgxWidgetBoundingRect) => {
      this.renderWidget(widget);
    });
  }

  clear() {
    localStorage.clear();
    this.grid.remove_all_widgets();
  }

  addWidget(widget: Widget) {
    this.widgets.push({ widget: widget.id });
    this.renderWidget({ widget: widget.id });
    this.serialize();
  }

  renderWidget(widget: Partial<NgxWidgetBoundingRect>) {
    const factory = this.cfr.resolveComponentFactory(this.widgetLib.get(widget.widget).component);
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

  load(): NgxWidgetBoundingRect[] {
    return JSON.parse(localStorage.getItem('widgets'));
  }

  protected serialize() {
    const serialized = this.grid.serialize()
      .map(this.cast.bind(this));
    this.persist(serialized);
  }

  protected persist(widgetsData: NgxWidgetBoundingRect) {
    localStorage.setItem('widgets', JSON.stringify(widgetsData));
  }

  // TODO get widget descriptor somehow
  protected cast({ col, row, size_x, size_y }, i): NgxWidgetBoundingRect {
    return { top: row, left: col, width: size_x, height: size_y, widget: this.widgets[i].widget };
  }
}
