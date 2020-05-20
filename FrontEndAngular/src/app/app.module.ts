import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './content/login/login.component';
import { HomepageComponent } from './content/homepage/homepage.component';
import { UsersComponent } from './content/users/users.component';
import { BooksComponent } from './content/books/books.component';
import { AdministrationComponent } from './content/administration/administration.component';
import { ContentComponent } from './content/content.component';
import { BookComponent } from './content/homepage/book/book.component';
import { BookDetailsComponent } from './content/book-details/book-details.component';
import { GenresComponent } from './content/homepage/genres/genres.component';
import { BooksAddComponent } from './content/books/books-add/books-add.component';
import { BookEditComponent } from './content/books/book-edit/book-edit.component';
import { SearchComponent } from './content/search/search.component';
import { UserAddComponent } from './content/users/user-add/user-add.component';
import { UserEditComponent } from './content/users/user-edit/user-edit.component';
import { TableComponent } from './content/administration/table/table.component';
import { TableLineComponent } from './content/administration/table-line/table-line.component';
import { BookBorrowComponent } from './content/books/book-borrow/book-borrow.component';
import { BooksService } from './services/books.service';
import { UsersService } from './services/users.service';
import { GenresService } from './services/genres.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomepageComponent,
    UsersComponent,
    BooksComponent,
    AdministrationComponent,
    ContentComponent,
    BookComponent,
    BookDetailsComponent,
    GenresComponent,
    BooksAddComponent,
    BookEditComponent,
    SearchComponent,
    UserAddComponent,
    UserEditComponent,
    TableComponent,
    TableLineComponent,
    BookBorrowComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
     
  ],
  providers: [
    UsersService,
    BooksService,
    GenresService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
