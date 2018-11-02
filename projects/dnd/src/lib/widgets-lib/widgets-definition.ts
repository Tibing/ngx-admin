import { TemperatureComponent } from './temperature/temperature.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { Widget } from '../widget-lib';


export const widgets: Widget[] = [
  {
    id: 'temperature',
    component: TemperatureComponent,
    height: 3,
    width: 2,
  },
  {
    id: 'electricity',
    component: ElectricityComponent,
    height: 2,
    width: 4,
  },
];
