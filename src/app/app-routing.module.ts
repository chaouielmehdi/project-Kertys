import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BeforeLoginGuard } from "./guards/before-login.guard";
import { AfterLoginGuard } from "./guards/after-login.guard";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login",
    canActivate: [BeforeLoginGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [BeforeLoginGuard],
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AfterLoginGuard],
  },
  {
    path: "**",
    component: HomeComponent,
    canActivate: [AfterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
