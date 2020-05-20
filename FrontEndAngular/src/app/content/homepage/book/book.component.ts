import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  pageNr: number = 1;
  
  @Input() childMessage: any;
  @Input() totalNr: any;

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;
  @Output() pageEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  getPageInfo(nr:number){
    this.pageNr = nr;
    this.sendpage();
  }

  sendpage() {
    this.pageEvent.emit(this.pageNr);
  }
}
