import { Component, Inject } from '@angular/core';
import { WIDGETS_REGISTRY } from './widgets-lib/widgets-lib.module';
import { NgxGridsterService } from './gridster.service';

@Component({
  selector: 'ngx-widget-lib',
  styles: [`
    :host /deep/ div.stub {
      width: 100%;
      height: 10rem;
      background-color: lightgray;
    }
  `],
  template: `
    <nb-list>
      <nb-list-item *ngFor="let comp of comps" (click)="addWidget(comp[0])">
        <ng-container [ngComponentOutlet]="comp[1]"></ng-container>
      </nb-list-item>
    </nb-list>
  `,
})

export class NgxWidgetLibComponent {
  comps = [];

  constructor(@Inject(WIDGETS_REGISTRY) widgetsRegistry,
              protected gridsterService: NgxGridsterService) {
    this.comps = Object.entries(widgetsRegistry);
  }

  addWidget(widget: string) {
    this.gridsterService.addWidget({ widget });
  }
}
