import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { fade } from "src/app/animations/fade";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/User";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [fade],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private _userService: UserService) {}

  ngOnInit() {}

  /*
   * (non-doc)
   * --------------------------------------------------------------------------
   * login form
   * --------------------------------------------------------------------------
   */

  loader: boolean = false;
  loginForm: FormGroup = this.fb.group({
    username: new FormControl(
      // default value
      "username",

      // validators
      [Validators.required, Validators.maxLength(190)]
    ),
    password: new FormControl(
      // default value
      "password",

      // validators
      [Validators.required, Validators.maxLength(190)]
    ),
  });

  submitLoginForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      // turn the button's loader on
      this.loader = true;

      const username = this.loginForm.get("username").value;

      this._userService.loginClient(new User(username));

      // turn the button's loader off
      this.loader = false;
    }
  }
}
