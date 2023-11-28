import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'primary' | 'success' | 'danger' | 'sky' | 'gray-light' = 'primary';

  get colors() {
    const colors: { [key: string]: string } = {
      primary: 'text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300',
      success: 'text-white bg-success-700 hover:bg-success-800 focus:ring-success-300',
      danger: 'text-white bg-danger-700 hover:bg-danger-800 focus:ring-danger-300',
      sky: 'text-white bg-sky-700 hover:bg-sky-800 focus:ring-sky-300',
      'gray-light': 'text-gray-700 text-left bg-gray-200 hover:bg-gray-500 focus:ring-gray-50',
    };
    return colors[this.color];
  }

}
