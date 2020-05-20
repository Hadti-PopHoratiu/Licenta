import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-borrow',
  templateUrl: './book-borrow.component.html',
  styleUrls: ['./book-borrow.component.css']
})
export class BookBorrowComponent implements OnInit {
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;
  
  bookId;
  tableUsers;
  bookName;

  users;
  pageNr: number = 1;
  totalNr: number;
  message: string = '';
  constructor(private user:UsersService, private bookDetails: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
    })
    this.getBookData();
  }
  async getBookData(){
    this.bookName = await this.bookDetails.getBookById(this.bookId).toPromise();
    this.getUserData();
    this.getUserFree();
  }

  getUserData(){
    this.user.getUserTable(this.bookName?.name).subscribe(response =>{
      this.tableUsers = response;
    })
  }

  getUserFree(){
    this.user.getUserFree(this.pageNr, this.message, this.bookName?.name).subscribe(response =>{
      this.users = response;
      this.totalNr =  0;
      if(Object.keys(response).length){
        this.totalNr = response[0].total
      }
    })
  }

  addUserBook(id){
    this.user.addUserBook({book: this.bookName?.name}, id).subscribe(
      res=>{console.log(this.bookName); this.getUserData(); this.getUserFree(); this.editBookCountUp()},
      err=>{ console.log(err)}
    )
  }

  receiveMessage($event) {
    this.message = $event
    this.pageNr = 1;
    this.getUserFree();
  }

  getPageInfo(nr:number){
    this.pageNr = nr;
    this.getUserFree()
  }

  deleteUserBook(id){
    this.user.deleteUserBook(id, this.bookName?.name).subscribe(
      res=>{this.getUserData(); this.getUserFree(); console.log('deleted'); this.editBookCountDown()},
      err=>{}
    )
  }

  editBookCountUp(){
    this.bookDetails.editBookCountUp(this.bookId, {}).subscribe(
      res=>{},
      err=>{}
    )
  }
  editBookCountDown(){
    this.bookDetails.editBookCountDown(this.bookId, {}).subscribe(
      res=>{},
      err=>{}
    )
  }
}
