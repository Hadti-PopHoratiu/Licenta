import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book;
  bookId;
  constructor(private bookDetails: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.bookId = params['id'];
    })

    this.bookDetails.getBookById(this.bookId).subscribe(response =>{
      this.book = response;
    })
  }

}
