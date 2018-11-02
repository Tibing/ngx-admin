import { Type } from '@angular/core';

export interface Widget {

  id: string;

  component: Type<any>;

  height: number;

  width: number;
}
