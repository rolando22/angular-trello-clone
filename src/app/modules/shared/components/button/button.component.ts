import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { colorButton, mapColorsButton, colorsButton } from '@models/color.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: colorButton = 'primary';

  faSpinner = faSpinner;

  mapColors: mapColorsButton = colorsButton;

  get colors() {
    return this.mapColors[this.color];
  }

}
