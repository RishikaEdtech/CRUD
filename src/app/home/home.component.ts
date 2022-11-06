import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  reactiveform!:FormGroup;
  constructor(private router:Router, private formbuilder:FormBuilder) {
    this.reactiveform = this.formbuilder.group({
      username: new FormControl('',Validators.email),
      password: new FormControl('', Validators.compose([Validators.minLength(8)])),
    })
   }


  ngOnInit(): void {

  }
  goToPage():void{ {

  }
  localStorage.setItem("FormData",JSON.stringify(this.reactiveform.value));
  }

get f() {
  return this.reactiveform.controls;
}

}