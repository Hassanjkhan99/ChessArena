import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Board1Component } from "./board1/board1.component";
import { NgxChessBoardModule } from "ngx-chess-board";
import { HomeComponent } from "./home/home.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StartScreenComponent } from "./start-screen/start-screen.component";

@NgModule({
  declarations: [
    AppComponent,
    Board1Component,
    HomeComponent,
    StartScreenComponent
  ],
  imports: [BrowserModule, AppRoutingModule, NgxChessBoardModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
