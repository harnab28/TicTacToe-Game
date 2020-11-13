import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

import { square } from '../../models/square.model';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  boxes: square[] = [];
  player: string = 'X';
  noOfCells: number;
  length: number = 5;
  coloumsArray: number[];
  rowsArray: number[];
  leftDiagonalArray: number;
  rightDiagonalArray: number;

  isGameEnd: Boolean;

  constructor(private snakbar: MatSnackBar) {}

  ngOnInit(): void {
    this.noOfCells = this.length * this.length;
    for (var i = 0; i < this.noOfCells; i++) {
      var temp: square = {
        value: undefined,
        x: Math.floor(i / 3),
        y: i % 3,
        disable: false,
      };

      this.boxes.push(temp);
    }

    this.initalArray(this.length);
  }

  initalArray(len: number) {
    this.isGameEnd = false;
    this.length = len;
    this.coloumsArray = [];
    this.rowsArray = [];
    this.leftDiagonalArray = 0;
    this.rightDiagonalArray = 0;
    for (let i = 0; i < len; i++) {
      this.coloumsArray.push(0);
      this.rowsArray.push(0);
    }
  }

  isWinner(index: number) {
    if (this.player == 'X') this.player = 'O';
    else this.player = 'X';
    this.boxes[index].value = this.player;
    this.boxes[index].disable = true;

    if (this.player == 'X') {
      if (++this.coloumsArray[this.boxes[index].x] == 3) {
        this.winnerSelected(this.player);
      } else if (++this.rowsArray[this.boxes[index].y] == 3) {
        this.winnerSelected(this.player);
      } else if (
        this.boxes[index].x === this.boxes[index].y &&
        ++this.leftDiagonalArray == 3
      ) {
        this.winnerSelected(this.player);
      } else if (
        this.boxes[index].x + this.boxes[index].y + 1 == this.length &&
        ++this.rightDiagonalArray == 3
      ) {
        this.winnerSelected(this.player);
      }
    } else {
      console.log('checking');
      if (--this.coloumsArray[this.boxes[index].x] == -3) {
        this.winnerSelected(this.player);
      } else if (--this.rowsArray[this.boxes[index].y] == -3) {
        this.winnerSelected(this.player);
      } else if (
        this.boxes[index].x === this.boxes[index].y &&
        --this.leftDiagonalArray == -3
      ) {
        this.winnerSelected(this.player);
      } else if (
        this.boxes[index].x + this.boxes[index].y + 1 == this.length &&
        --this.rightDiagonalArray == -3
      ) {
        this.winnerSelected(this.player);
      }
    }
  }

  winnerSelected(player: string) {
    console.log('Winner is : ' + player);
    this.isGameEnd = true;
    this.disabelBtnAll();
    this.snakbar.open('Game Ended by ', ` ${player}`, {
      duration: 3000,
    });
  }

  disabelBtnAll() {
    for (var i = 0; i < this.noOfCells; i++) {
      this.boxes[i].disable = true;
    }
  }

  resetGame() {
    //this.length = 3;
    this.noOfCells = this.length * this.length;
    this.boxes = [];
    for (var i = 0; i < this.noOfCells; i++) {
      var temp: square = {
        value: undefined,
        x: Math.floor(i / 3),
        y: i % 3,
        disable: false,
      };

      this.boxes.push(temp);
    }
    this.initalArray(this.length);
  }
}
