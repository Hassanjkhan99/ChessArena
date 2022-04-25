import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Board1Component } from "./board1/board1.component";
import { HomeComponent } from "./home/home.component";
import { StartScreenComponent } from "./start-screen/start-screen.component";

const routes: Routes = [
  { path: "board1", component: Board1Component },
  { path: "start", component: StartScreenComponent },
  { path: "home", component: HomeComponent },
  { path: "**", component: StartScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
