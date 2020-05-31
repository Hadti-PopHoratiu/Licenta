import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BooksService } from "src/app/services/books.service";
import { GenresService } from "src/app/services/genres.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-books-add",
  templateUrl: "./books-add.component.html",
  styleUrls: ["./books-add.component.css"],
})
export class BooksAddComponent implements OnInit {
  genres;
  constructor(
    private book: BooksService,
    private genre: GenresService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.genre.getGenres().subscribe((response) => {
      this.genres = response;
    });
  }

  submit(form) {
    this.book
      .addBook({
        name: form.value.name,
        author: form.value.author,
        date: form.value.date,
        genre: form.value.genre,
        description: form.value.description,
        isbn: form.value.isbn,
        total: form.value.bookCount,
        image: form.value.image,
      })
      .subscribe(
        (res) => {
          this.router.navigate(["../../../books"]);
        },
        (err) => {}
      );
    console.log(form.value);
  }
}
