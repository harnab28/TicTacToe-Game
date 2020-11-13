import { Component, OnInit } from '@angular/core';

import { square } from '../../models/square.model';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  boxes: square[] = [];
  player: string = 'X';

  constructor() {}

  ngOnInit(): void {
    for (var i = 0; i < 9; i++) {
      var temp: square = {
        value: undefined,
        x: i / 3,
        y: i % 3,
      };

      this.boxes.push(temp);
    }
  }

  changePlayer(i: number) {
    if (this.player == 'X') this.player = 'O';
    else this.player = 'X';
    this.boxes[i].value = this.player;
  }
}
