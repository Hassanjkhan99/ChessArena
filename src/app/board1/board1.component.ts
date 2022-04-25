import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { MoveChange, NgxChessBoardView } from "ngx-chess-board";
import { MoveEventExtended } from "../home/home.component";

@Component({
  selector: "app-board1",
  templateUrl: "./board1.component.html",
  styleUrls: ["./board1.component.scss"]
})
export class Board1Component implements OnInit, AfterViewInit {
  @ViewChild("board", { static: false })
  board!: NgxChessBoardView;
  isBlack: boolean = false;
  dragDisabled: boolean = false;
  drawDisabled: boolean = false;
  freeMode: boolean = false;
  showActivePieces: boolean = true;
  showCoords: boolean = true;
  showLastMove: boolean = true;
  showLegalMoves: boolean = true;
  showPossibleCaptures: boolean = true;
  boardSize: number = window.outerWidth / 5.2;
  darkTileColor: string = "#6e3e14";
  lightTileColor: string = "#fffce0";

  constructor() {
  }

  @HostListener("window:message", ["$event"])
  onMessage({ data }: MessageEvent<MoveEventExtended>): void {
    if (data.reset) {
      this.reset();
      localStorage.clear();
      return;
    }
    if (data.move) {
      this.board.move(data.move);
    }
    if (data.black) {
      this.isBlack = true;
      this.board.reverse();
    }
  }

  ngAfterViewInit(): void {
    const moves = localStorage.getItem("moves");
    // @ts-ignore
    this.board.setFEN(moves);
  }

  ngOnInit(): void {
  }

  reset() {
    this.board.reset();
    this.isBlack ? this.board.reverse() : null;
  }

  moveChange($event: MoveChange) {
    window.parent.postMessage($event);
    localStorage.setItem("moves", this.board.getFEN());
  }
}
