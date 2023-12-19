import { Component, Input } from '@angular/core';

import { color, colorsCard, mapColorsCard } from '@models/color.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: color = 'sky';

  mapColors: mapColorsCard = colorsCard;

  get colors() {
    return this.mapColors[this.color];
  }

}
