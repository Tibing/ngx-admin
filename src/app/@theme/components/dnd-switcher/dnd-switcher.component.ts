import { Component, Input } from '@angular/core';
import { ChGrid } from '../../../../../projects/dnd/src/lib/grid';

@Component({
  selector: 'ngx-dnd-switcher',
  template: `
    <ngx-switcher
      [firstValue]="true"
      [secondValue]="false"
      firstValueLabel="DnD Enabled"
      secondValueLabel="Dnd Disabled"
      [value]="true"
      (valueChange)="toggleDirection($event)"
      [vertical]="vertical"
    >
    </ngx-switcher>
  `,
})
export class DndSwitcherComponent {

  @Input() vertical: boolean = false;

  constructor(protected grid: ChGrid) {
  }

  toggleDirection(enabled: boolean) {
    if (enabled) {
      this.grid.enable();
    } else {
      this.grid.disable();
    }
  }
}
