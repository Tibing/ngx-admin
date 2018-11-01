import { Directive, Input, OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbThemeService } from '@nebular/theme';


/**
 * Represents widget dimensions.
 * Width and height have to be assigned in columns and rows.
 * */
export interface NgxWidgetDimension {
  height: number;
  width: number;
}

export interface NgxWidgetDimensions {
  xs: NgxWidgetDimension;
  is: NgxWidgetDimension;
  sm: NgxWidgetDimension;
  md: NgxWidgetDimension;
  lg: NgxWidgetDimension;
  xl: NgxWidgetDimension;
  xxl: NgxWidgetDimension;
  xxxl: NgxWidgetDimension;
}

@Directive({
  selector: '[ngxWidget]',
  host: {
    '[attr.data-row]': '1',
    '[attr.data-col]': '1',
    '[attr.data-sizex]': 'width',
    '[attr.data-sizey]': 'height',
  },
})

export class NbWidgetDirective implements OnInit {
  @Input('ngxWidgetHeight') height;
  @Input('ngxWidgetWidth') width;

  constructor(protected themeService: NbThemeService) {
  }

  ngOnInit() {
    this.themeService.onMediaQueryChange()
      .subscribe(([prev, curr]: NbMediaBreakpoint[]) => {
        // change height and width
        // has to be configurable via inputs
      });

  }
}
