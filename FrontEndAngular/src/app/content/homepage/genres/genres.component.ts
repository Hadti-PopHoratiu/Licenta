import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  @Output() genreEvent = new EventEmitter<string>();
  genres;
  genreFilter;
  check: boolean
  myForm: FormGroup;

  constructor(private genre:GenresService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.genre.getGenres().subscribe(response =>{
      this.genres = response;
    })

    this.myForm = this.fb.group({
      genreArray: this.fb.array([])
    });
  }



  sendGenre() {
    this.genreEvent.emit(this.genreFilter);
  }

  onChange(genre:string, isChecked: boolean) {
    const genreFormArray = <FormArray>this.myForm.controls.genreArray;
  
    if(isChecked) {
      genreFormArray.push(new FormControl(genre));
      this.genreFilter = genreFormArray.value;
      
    } else {
      let index = genreFormArray.controls.findIndex(x => x.value == genre)
      genreFormArray.removeAt(index);
      this.genreFilter = genreFormArray.value;
      
    }
    this.sendGenre();
  }
}
