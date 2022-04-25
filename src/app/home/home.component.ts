import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MoveChange } from "ngx-chess-board";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("board1")
  board1!: ElementRef<HTMLIFrameElement>;

  @ViewChild("board2")
  board2!: ElementRef<HTMLIFrameElement>;

  @ViewChild("win")
  win!: ElementRef<any>;

  @ViewChild("lose")
  lose!: ElementRef<any>;
  board1Path = this.sanitizer.bypassSecurityTrustResourceUrl("board1");
  board2Path = this.sanitizer.bypassSecurityTrustResourceUrl("board2");
  closeResult: string = "";
  private loadedBoard1: boolean = false;
  private loadedBoard2: boolean = false;
  loading: boolean = !this.loadedBoard1 || !this.loadedBoard2;
  private isActiveModal: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
  }

  @HostListener("window:message", ["$event"])
  onMessage({ data }: MessageEvent<MoveEventExtended>): void {
    console.log(data);
    // @ts-ignore
    this.board1.nativeElement.contentWindow.postMessage(data);
    // @ts-ignore
    this.board2.nativeElement.contentWindow.postMessage(data);
    if (data.checkmate) {
      this.open(data.color === "white" ? this.win : this.lose);
    }
  }

  ngOnInit(): void {
    this.modalService.activeInstances.subscribe(
      (e) => (this.isActiveModal = e.length > 0)
    );
  }

  ngAfterViewInit(): void {
  }

  post(e: any) {
    if (e === "reset") {
      window.postMessage({ reset: true });
      // @ts-ignore
      this.board1.nativeElement.contentWindow.postMessage({ black: false });
      // @ts-ignore
      this.board2.nativeElement.contentWindow.postMessage({ black: true });
    }
    window.postMessage(e);
  }

  open(content: any) {
    if (this.isActiveModal) {
      return;
    }
    this.modalService.open(content).result.then((result) => {
      this.post(result);
    });
  }

  setBoard1() {
    this.board1.nativeElement.style.height = "65vh";
    this.board1.nativeElement.style.width = "40vw";
    this.board1.nativeElement.style.position = "absolute";
    this.board1.nativeElement.style.left = "10vw";
    this.board1.nativeElement.style.top = "15vw";
    // @ts-ignore
    this.board1.nativeElement.contentWindow.postMessage({ black: false });
    this.loadedBoard1 = true;
    this.loading = !this.loadedBoard1 || !this.loadedBoard2;
  }

  setBoard2() {
    this.board2.nativeElement.style.height = "65vh";
    this.board2.nativeElement.style.width = "40vw";
    this.board2.nativeElement.style.position = "absolute";
    this.board2.nativeElement.style.right = "10vw";
    this.board2.nativeElement.style.top = "15vw";
    // @ts-ignore
    this.board2.nativeElement.contentWindow.postMessage({ black: true });
    this.loadedBoard2 = true;
    this.loading = !this.loadedBoard1 || !this.loadedBoard2;
  }
}

export interface MoveEventExtended extends MoveChange {
  color: string;
  move: string;
  checkmate: boolean;
  black: boolean;
  reset: boolean;
}
