import { Component, OnInit } from "@angular/core";
import { fade } from "src/app/animations/fade";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [fade],
})
export class HeaderComponent implements OnInit {
  isUserConnected: boolean = false;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    // Subscription to the isUserConnected
    this._userService.authStatus$.subscribe((status) => {
      this.isUserConnected = status;
    });
  }

  logout() {
    this._userService.logoutClient();
  }
}
