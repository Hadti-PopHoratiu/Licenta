import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {
  genres;
  @Output() refreshEvent = new EventEmitter<string>();
  constructor(private book:BooksService, private genre: GenresService) { }
  refresh;
  ngOnInit(): void {
    this.genre.getGenres().subscribe(response=>{
      this.genres =response;
    })
  }
  
  submit(form){
    this.book.addBook({name: form.value.name, author: form.value.author, date: form.value.date, genre: form.value.genre, description: form.value.description, isbn: form.value.isbn, total: form.value.bookCount, image: form.value.image}).subscribe(
      res=>{this.sendRefresh()},
      err=>{}
    )
    console.log(form.value);
  }

  sendRefresh() {
    this.refreshEvent.emit(this.refresh)
  }
}
