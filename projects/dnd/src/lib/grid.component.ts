import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxGridConfig } from './gridster.service';
import { ChGrid } from './grid';


@Component({
  selector: 'ch-grid',
  styles: [`
    /deep/ [data-col] {
      overflow: hidden;
    }

    /deep/ [data-col] /deep/ nb-card {
      margin: 0;
      height: 100% !important;
    }
  `],
  template: `
    <ng-template></ng-template>
  `,
  host: { 'class': 'gridster' },
})

export class ChGridComponent implements OnInit {
  @ViewChild(TemplateRef, { read: ViewContainerRef }) anchor: ViewContainerRef;

  constructor(protected gridster: ChGrid,
              protected elementRef: ElementRef) {
    this.gridster.setGridComponent(this);
  }

  ngOnInit() {
    const config = this.createGridConfig();
    this.gridster.createGrid(config);
  }

  protected createGridConfig(): NgxGridConfig {
    return new NgxGridConfig({
      gridElement: this.elementRef.nativeElement,
    });
  }
}
