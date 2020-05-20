import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;
  add = false;
  edit = false;
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
    this.getBookData()
  }

  addToggle(){
    this.add = !this.add;
    this.edit = false;
  }

  editToggle(){
    this.edit = true;
    this.add = false;
  }

  delete(){

  }

  getPageInfo(nr:number){
    this.pageNr = nr;
    this.getBookData();
  }
  receiveMessage($event) {
    this.query.search = $event;
    
    this.getBookData();
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
  getBookData(){
    this.book.getBooks(this.pageNr, this.query.search, this.query.book, this.query.author, this.query.genres).subscribe(response =>{
    this.books = response;
    console.log(this.books);
    this.totalPages =  0;
      if(Object.keys(response).length){
        
        this.totalPages = response[0].count
        console.log(this.totalPages);
      }
  })
  }

  deleteBook(id){
    this.book.deleteBook(id).subscribe(
      res=>{this.getBookData(); console.log('deleted')},
      err=>{}
    )
  }

  receiveRefresh($event) {
    this.getBookData();
  }
}
