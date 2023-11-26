import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'primary' | 'success' = 'primary';

  get colors() {
    const colors: { [key: string]: string } = {
      primary: 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300',
      success: 'bg-success-700 hover:bg-success-800 focus:ring-success-300',
    };
    return colors[this.color];
  }

}
