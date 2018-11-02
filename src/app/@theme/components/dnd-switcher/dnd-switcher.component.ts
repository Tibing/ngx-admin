import { Component, Input } from '@angular/core';
import { ChGridsterService } from '../../../../../projects/dnd/src/lib/gridster.service';

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

  constructor(protected grid: ChGridsterService) {
  }

  toggleDirection(enabled: boolean) {
    if (enabled) {
      this.grid.enable();
    } else {
      this.grid.disable();
    }
  }
}
