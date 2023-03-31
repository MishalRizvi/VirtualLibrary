import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books:any = [];

  constructor(private crudApi: CrudService) { }

  ngOnInit(): void {
    this.crudApi.GetAllBooks().subscribe((res:any) => {
      this.books = res;
    })
  }

  deleteBook(id:any, index:any) {
    if (window.confirm("Are you sure you would like to delete this book?")) {
      this.crudApi.DeleteBook(id).subscribe((res:any) => {
        this.books.splice(index, 1); //replaces one element at the index chosen 
      })
    }
  }
}
