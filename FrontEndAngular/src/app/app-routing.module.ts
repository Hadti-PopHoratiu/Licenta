import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./content/homepage/homepage.component";
import { LoginComponent } from "./content/login/login.component";
import { BooksComponent } from "./content/books/books.component";
import { UsersComponent } from "./content/users/users.component";
import { BookDetailsComponent } from "./content/book-details/book-details.component";
import { BookBorrowComponent } from "./content/books/book-borrow/book-borrow.component";
import { TableComponent } from "./content/administration/table/table.component";
import { BookEditComponent } from "./content/books/book-edit/book-edit.component";
import { UserEditComponent } from "./content/users/user-edit/user-edit.component";
import { UserAddComponent } from "./content/users/user-add/user-add.component";
import { BooksAddComponent } from "./content/books/books-add/books-add.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "books", component: BooksComponent },
  { path: "books/add", component: BooksAddComponent },
  { path: "book/:id", component: BookDetailsComponent },
  { path: "books/edit/:id", component: BookEditComponent },
  { path: "table/:id", component: BookBorrowComponent },
  { path: "users", component: UsersComponent },
  { path: "users/add", component: UserAddComponent },
  { path: "users/edit/:id", component: UserEditComponent },
  { path: "administration", component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
