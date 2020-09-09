import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { fade } from "src/app/animations/fade";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [fade],
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private _userService: UserService) {}

  ngOnInit() {}
}
