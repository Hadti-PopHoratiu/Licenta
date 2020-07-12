import { Component, OnInit } from "@angular/core";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  pageNr: number = 1;
  filter: boolean = true;
  isBook = true;
  isAuthor = false;

  parentMessage;
  totalPages;

  query = {
    book: true,
    author: false,
    search: "",
    genres: [],
  };

  constructor(private book: BooksService) {}

  ngOnInit(): void {
    this.getBooksData();
  }

  receiveFilter($event) {
    this.filter = $event;
    if (this.filter === true) {
      this.isBook = true;
      this.isAuthor = false;
    } else {
      this.isBook = false;
      this.isAuthor = true;
    }
    this.pageNr = 1;
    this.query.book = this.isBook;
    this.query.author = this.isAuthor;
  }
  receiveGenre($event) {
    this.query.genres = $event;
  }

  receivePage($event) {
    this.pageNr = $event;
    this.getBooksData();
  }

  receiveMessage($event) {
    this.query.search = $event;
    this.getBooksData();
  }

  getBooksData() {
    this.book
      .getBooks(
        this.pageNr,
        this.query.search,
        this.query.book,
        this.query.author,
        this.query.genres
      )
      .subscribe((response) => {
        this.parentMessage = response;
        this.totalPages = 0;
        if (Object.keys(response).length) {
          this.totalPages = response[0].count;
        }
      });
  }
}
