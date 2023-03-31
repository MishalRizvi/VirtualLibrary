import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private crudApi: CrudService) {
    //The fields that you will define for the FormGroup must match the fields that you defined for the Book model in Book.js, otherwise it won't work
    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    });
   }

  ngOnInit(): void {
  }

  onSubmit():any {
    this.crudApi.AddBook(this.bookForm.value).subscribe((res:any) => {
      console.log("Book added successfully.");
      alert("Book added successfully.");
      //ngZone is needed for redirecting the URL once the book has been added 
      this.ngZone.run(() => {
        this.router.navigateByUrl('/books-list');
      }, (err:any) => {
        console.log(err);
      })
    })
  }

}
