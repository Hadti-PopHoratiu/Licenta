import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  href: string = "";
  book = true;
  message = '';
  radioBook = true;
  radioAuthor = false;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() radioEvent = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.href = this.router.url;
    if (this.href === '/administration' || this.href === '/books' || this.href === '/')
      this.book = true;
    else{
      this.book = false;
    }
    this.sendMessage();
    this.sendFilter();
  }

  OnInput(data: string) {
    this.message = data;
    this.sendMessage();
  }

  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  sendFilter() {
    this.radioEvent.emit(this.radioBook)
  }

  onItemChange(value){
    if(value === 'book'){
      
      this.radioBook = true;
      this.radioAuthor = false;
      
    }
    else if(value ==='author'){
      
      this.radioBook = false;
      this.radioAuthor = true;
    }
    this.sendFilter();
 }
}
