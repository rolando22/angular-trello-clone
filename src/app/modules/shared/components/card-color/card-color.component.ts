import { Component, Input } from '@angular/core';

import { colorCard, mapColorsCard } from '@models/color.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent {

  @Input() color: colorCard = 'sky';

  mapColors: mapColorsCard = {
    sky: 'bg-sky-700 hover:bg-sky-800 text-white',
    yellow: 'bg-yellow-700 hover:bg-yellow-800 text-white',
    green: 'bg-green-700 hover:bg-green-800 text-white',
    red: 'bg-red-700 hover:bg-red-800 text-white',
    violet: 'bg-violet-700 hover:bg-violet-800 text-white',
    gray: 'bg-gray-700 hover:bg-gray-800 text-white',
  };

  get colors() {
    return this.mapColors[this.color];
  }

}
