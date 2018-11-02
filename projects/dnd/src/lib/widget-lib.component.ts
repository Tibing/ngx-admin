import { Component } from '@angular/core';
import { ChGridsterService } from './gridster.service';
import { Widget } from './widget-lib';
import { ChWidgetLibService } from './widget-lib.service';

@Component({
  selector: 'ch-widget-lib',
  styles: [`
    :host /deep/ div.stub {
      width: 100%;
      height: 10rem;
      background-color: lightgray;
    }
  `],
  template: `
    <nb-list>
      <nb-list-item *ngFor="let comp of comps" (click)="addWidget(comp)">
        <ng-container [ngComponentOutlet]="comp.component"></ng-container>
      </nb-list-item>
    </nb-list>
  `,
})

export class ChWidgetLibComponent {
  comps: Widget[] = [];

  constructor(protected widgetLib: ChWidgetLibService,
              protected gridsterService: ChGridsterService) {
    this.comps = this.widgetLib.getAll();
  }

  addWidget(widget: Widget) {
    this.gridsterService.addWidget(widget);
  }
}
