import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form!: FormGroup
  displayLimit: number[] = [ 5, 10, 15, 20 ]
  gamesPerPage!: number

  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.createForm()
    this.gamesPerPage = this.form.value['gamesPerPage']
  }

  setGamesPerPage() {
    console.log("in setGamesPerPage")
    console.log(this.form.value);
    this.gamesPerPage = parseInt(this.form.value['gamesPerPage'])
    console.log(this.gamesPerPage)
  }

  createForm() {
    this.form = this.fb.group({
      gamesPerPage: this.fb.control<number>(10, [ Validators.required ])
    })
  }

}
