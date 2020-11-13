import { Component, EventEmitter, Input, Output } from '@angular/core';

import { square } from '../../models/square.model';
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent {
  @Input() value: square;
  @Output() index = new EventEmitter<square>();

  disableBtn: Boolean = false;

  disableButton() {
    this.disableBtn = true;
  }
}
