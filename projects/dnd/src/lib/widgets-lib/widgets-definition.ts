import { TemperatureComponent } from './temperature/temperature.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { WidgetDefinition } from '../widget-lib';


export const widgets: WidgetDefinition[] = [
  {
    id: 'temperature',
    component: TemperatureComponent,
    defaultHeight: 8,
    defaultWidth: 5,
  },
  {
    id: 'electricity',
    component: ElectricityComponent,
    defaultHeight: 8,
    defaultWidth: 11,
  },
];
