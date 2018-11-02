import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbListModule } from '@nebular/theme';

import { ChGridComponent } from './grid.component';
import { ChWidgetLibComponent } from './widget-lib.component';
import { ChWidgetsLibModule } from './widgets-lib/widgets-lib.module';
import { ChGridsterService } from './gridster.service';
import { ChGrid } from './grid';
import { GridsterModule } from 'angular-gridster2';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    ChWidgetsLibModule,
    GridsterModule,
  ],
  exports: [ChGridComponent, ChWidgetLibComponent],
  declarations: [ChGridComponent, ChWidgetLibComponent],
})
export class ChWidgetModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ChWidgetModule,
      providers: [{ provide: ChGrid, useClass: ChGridsterService }],
    };
  }
}
