import { Component } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { ChGridsterService, ChGridsterWidget } from './gridster.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'ch-grid',
  styles: [`
    :host .disabled {
      pointer-events: none;
    }

    gridster-item {
      background: none;
    }
  `],
  template: `
    <gridster [options]="options$ | async">
      <gridster-item [item]="widget" *ngFor="let widget of widgets$ | async">
        <div [class.disabled]="disabled$ | async">
          <ng-template [ngComponentOutlet]="widget.component"></ng-template>
        </div>
      </gridster-item>
    </gridster>
  `,
})

export class ChGridComponent {
  options$: Observable<GridsterConfig>;
  widgets$: Observable<ChGridsterWidget[]>;
  disabled$: Observable<boolean>;

  constructor(protected gridster: ChGridsterService) {
    this.widgets$ = this.gridster.widgets$;
    this.options$ = this.gridster.options$;
    this.disabled$ = this.gridster.options$
      .pipe(
        map((options: GridsterConfig) => options.draggable.enabled),
      );
  }
}
