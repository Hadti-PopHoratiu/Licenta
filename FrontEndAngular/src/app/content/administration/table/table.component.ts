import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  books;
  pageNr: number = 1;
  filter: boolean = true;
  isBook = true;
  isAuthor = false;
  totalPages;

  query = {
    book: true,
    author: false,
    search: '',
    genres: []
  }
  constructor(private book: BooksService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getPageInfo(nr:number){
    this.pageNr = nr;
    this.getUserData();
  }

  receiveMessage($event) {
    this.query.search = $event;
    
    this.getUserData();
  }

  receiveFilter($event) {
    
    this.filter = $event
    if (this.filter === true){
      this.isBook = true;
      this.isAuthor = false;
    }
    else{
      this.isBook = false;
      this.isAuthor = true;
    }
    this.pageNr = 1;
    this.query.book = this.isBook;
    this.query.author = this.isAuthor;
  }
  getUserData(){
    this.book.getBooks(this.pageNr, this.query.search, this.query.book, this.query.author, this.query.genres).subscribe(response =>{
      this.books = response;
      console.log(this.books)
      this.totalPages =  0;
      if(Object.keys(response).length){
        
        this.totalPages = response[0].count
        console.log(this.totalPages);
      }
    })
  }
}
