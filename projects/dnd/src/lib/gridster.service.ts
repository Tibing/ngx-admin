import { Injectable, Type } from '@angular/core';
import { Widget, WidgetDefinition } from './widget-lib';
import { ChWidgetLibService } from './widget-lib.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { map, tap } from 'rxjs/operators';


export interface ChGridsterWidget extends GridsterItem {
  id: string;
  instanceId: string;
  component: Type<any>;
}

@Injectable({ providedIn: 'root' })
export class ChWidgetStoreService {
  load(): Observable<Widget[]> {
    const widgets = JSON.parse(localStorage.getItem('widgets'));
    return of(widgets || []);
  }

  persist(widgets: Widget[]): Observable<boolean> {
    localStorage.setItem('widgets', JSON.stringify(widgets));
    return of(true);
  }
}

@Injectable({ providedIn: 'root' })
export class ChWidgetMapperService {
  widgetToGridsterItem(widget: Widget): GridsterItem {
    return {
      id: widget.id,
      cols: widget.width,
      rows: widget.height,
      y: widget.top,
      x: widget.left,
    };
  }

  gridsterItemToWidget(gridsterItem: ChGridsterWidget): Widget {
    return {
      id: gridsterItem.id,
      instanceId: gridsterItem.instanceId,
      width: gridsterItem.cols,
      height: gridsterItem.rows,
      top: gridsterItem.y,
      left: gridsterItem.x,
    };
  }

  gridsterItemListToWidgetList(gridsterItems: ChGridsterWidget[]): Widget[] {
    return gridsterItems.map(gridsterItem => this.gridsterItemToWidget(gridsterItem));
  }

  widgetDefinitionToGridsterItem(widgetDefinition: WidgetDefinition, instanceId: string): ChGridsterWidget {
    return {
      instanceId,
      component: widgetDefinition.component,
      id: widgetDefinition.id,
      x: 0,
      y: 0,
      cols: widgetDefinition.defaultWidth,
      rows: widgetDefinition.defaultHeight,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class ChGridsterService {
  protected widgets: BehaviorSubject<ChGridsterWidget[]> = new BehaviorSubject<ChGridsterWidget[]>([]);
  readonly widgets$: Observable<ChGridsterWidget[]> = this.widgets.asObservable();

  protected options: BehaviorSubject<GridsterConfig> = new BehaviorSubject<GridsterConfig>({
    gridType: GridType.ScrollVertical,
    compactType: CompactType.None,
    minCols: 16,
    maxCols: 16,
    fixedRowHeight: 32,
    pushItems: true,
    draggable: {
      enabled: true,
    },
    resizable: {
      enabled: true,
    },
    displayGrid: DisplayGrid.None,
    itemChangeCallback: this.onChange.bind(this),
  });
  readonly options$: Observable<GridsterConfig> = this.options.asObservable();

  constructor(protected widgetLib: ChWidgetLibService,
              protected widgetStore: ChWidgetStoreService,
              protected widgetMapper: ChWidgetMapperService) {
    this.createGrid();
  }

  onChange(gridsterItem: ChGridsterWidget) {
    const widget = this.widgets.getValue().find(({ instanceId }) => instanceId === gridsterItem.instanceId);
    widget.x = gridsterItem.x;
    widget.y = gridsterItem.y;
    widget.cols = gridsterItem.cols;
    widget.rows = gridsterItem.rows;
    this.serialize();
  }

  createGrid() {
    this.widgetStore.load()
      .pipe(
        map((widgets: Widget[]) => {
          return widgets.map((widget: Widget) => {
            const gridsterItem = this.widgetMapper.widgetToGridsterItem(widget);
            const component = this.widgetLib.get(widget.id).component;

            return { ...gridsterItem, component, id: widget.id, instanceId: widget.instanceId };
          });
        }),
        tap(console.log.bind(console)),
      )
      .subscribe(widgets => this.widgets.next(widgets));
  }

  clear() {
    this.widgetStore.persist([]);
    this.widgets.next([]);
  }

  addWidget(widget: WidgetDefinition) {
    const nextIndex = this.widgets.getValue()
      .filter(({ id }) => id === widget.id).length;
    const nextId = `${widget.id}-${nextIndex}`;
    const gridsterItem = this.widgetMapper.widgetDefinitionToGridsterItem(widget, nextId);
    this.widgets.next([...this.widgets.getValue(), gridsterItem]);
    this.serialize();
  }

  enable() {
    this.options.next({
      ...this.options.getValue(),
      draggable: {
        ...this.options.getValue().draggable,
        enabled: true,
      },
      resizable: {
        ...this.options.getValue().resizable,
        enabled: true,
      },
    });
  }

  disable() {
    this.options.next({
      ...this.options.getValue(),
      draggable: {
        ...this.options.getValue().draggable,
        enabled: false,
      },
      resizable: {
        ...this.options.getValue().resizable,
        enabled: false,
      },
    });
  }

  protected serialize() {
    const gridsterItems = this.widgets.getValue();
    const widgets = this.widgetMapper.gridsterItemListToWidgetList(gridsterItems);

    this.widgetStore.persist(widgets);
  }
}
