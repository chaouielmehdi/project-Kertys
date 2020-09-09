import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { User } from "../models/User";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // Holds if the user is connected or not
  private isUserConnected = new BehaviorSubject<boolean>(
    localStorage.getItem("username") ? true : false
  );

  authStatus$ = this.isUserConnected.asObservable();

  // user attrs
  user: User = new User();
  @Output() userEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(private router: Router, private message: NzMessageService) {
    this.getAndEmitConnectedUser();
  }

  /**
   * Gets and emit connected user to the subscribers
   */
  getAndEmitConnectedUser(): void {
    // a simulation of an API request
    setTimeout(() => {
      const username = localStorage.getItem("username");

      this.user = new User(username);

      this.userEventEmitter.emit(this.user);
    }, 1000);
  }

  /**
   * Logins client side
   * @param user
   */
  loginClient(user: User): void {
    this.router.navigateByUrl("/home");

    this.message.info("Bienvenue!");

    localStorage.setItem("username", user.username);

    this.changeAuthStatus$(true);

    this.getAndEmitConnectedUser();
  }

  /**
   * Changes auth status
   * @param value
   */
  changeAuthStatus$(value) {
    this.isUserConnected.next(value);
  }

  /**
   * Logouts client side
   */
  logoutClient() {
    localStorage.removeItem("username");

    this.emptyUser();

    this.changeAuthStatus$(false);

    this.router.navigateByUrl("/login");
  }

  emptyUser() {
    this.userEventEmitter.emit(new User());
  }
}
