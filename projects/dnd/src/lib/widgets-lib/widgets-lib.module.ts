import { InjectionToken, NgModule } from '@angular/core';

import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { TeamComponent } from './team/team.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbSecurityModule } from '@nebular/security';
import { widgets } from './widgets-definition';

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NgbModule,
  NbSecurityModule, // *nbIsGranted directive,
  NbProgressBarModule,
];

const COMPONENTS = [
  StatusCardComponent,
  TemperatureDraggerComponent,
  ContactsComponent,
  RoomSelectorComponent,
  TemperatureComponent,
  RoomsComponent,
  TeamComponent,
  KittenComponent,
  SecurityCamerasComponent,
  ElectricityComponent,
  ElectricityChartComponent,
  WeatherComponent,
  PlayerComponent,
  SolarComponent,
  TrafficComponent,
  TrafficChartComponent,
];

export const WIDGET_REGISTRY = new InjectionToken<any>('widgets registry');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule,
    ...NB_MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: [
    {
      provide: WIDGET_REGISTRY,
      useValue: widgets,
    },
  ],
})
export class ChWidgetsLibModule {
}
