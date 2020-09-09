import { Component, OnInit } from "@angular/core";
import { fade } from "src/app/animations/fade";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
  animations: [fade],
})
export class MenuComponent implements OnInit {
  isCollapsed = false;

  isUserConnected: boolean = false;
  user: User;

  menuItems = [
    {
      route: "/home",
      name: "Accueil",
      icon: "home",
    },
  ];

  constructor(private _userService: UserService) {}

  ngOnInit() {
    // Subscription to the isUserConnected
    this._userService.authStatus$.subscribe((status) => {
      this.isUserConnected = status;
    });

    // Subscription to userEventEmitter
    this._userService.userEventEmitter.subscribe((user) => {
      this.user = user;
    });
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
