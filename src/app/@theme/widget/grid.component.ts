import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxGridConfig, NgxGridsterService } from './gridster.service';
import { WIDGETS_REGISTRY } from './widgets-lib/widgets-lib.module';

@Component({
  selector: 'ngx-widget-stub',
  template: `
    <nb-card style="height: 100%;">
      <nb-card-header>Widget Stub</nb-card-header>
      <nb-card-body>
        <div style="height: 100%; background-color: green"></div>
      </nb-card-body>
    </nb-card>
  `,
})

export class NgxWidgetStubComponent {
}

@Component({
  selector: 'ngx-grid',
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

export class NbGridComponent implements OnInit {
  @ViewChild(TemplateRef, { read: ViewContainerRef }) anchor: ViewContainerRef;

  constructor(protected gridster: NgxGridsterService,
              protected elementRef: ElementRef,
              @Inject(WIDGETS_REGISTRY) protected widgetsRegistry) {
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
