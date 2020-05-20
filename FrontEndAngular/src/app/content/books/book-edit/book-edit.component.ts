import { Component, OnInit } from '@angular/core';
import { GenresService } from 'src/app/services/genres.service';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookId;
  data;

  genres;

  name;
  author;
  date;
  bookGenre;
  total;
  isbn;
  description;
  image;
  constructor(private genre: GenresService, private book: BooksService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
    })

    this.genre.getGenres().subscribe(response=>{
      this.genres =response;
    })

    this.book.getBookById(this.bookId).subscribe(response=>{
      this.data = response;
      this.name = this.data.name;
      this.author = this.data.author;
      this.date = this.data.date;
      this.bookGenre = this.data.genre;
      this.total = this.data.total;
      this.isbn = this.data.isbn;
      this.description = this.data.description;
      this.image = this.data.image;
    })

  }

  submit(form){
    this.book.editBookById(this.bookId, {name: form.value.name, author: form.value.author, date: form.value.date, genre: form.value.genre, description: form.value.description, isbn: form.value.isbn, total: form.value.total, image: form.value.image}).subscribe(
      res=>{this.router.navigate(['../../../books'])},
      err=>{}
    )
    console.log(form.value);
  }

}
