import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/books.selectors';
import { BooksActions, BooksApiActions } from './state/books.actions';
import { GoogleBooksService } from './book-list/books.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BookListComponent, BookCollectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private readonly store = inject(Store)
  private readonly booksService = inject(GoogleBooksService)
  books$ = this.store.select(selectBooks)
  bookCollection$ = this.store.select(selectBookCollection)
  title = 'ngrx-example';

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }))
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }))
  }
  ngOnInit(): void {
    this.booksService.getBooks().subscribe((books) => this.store.dispatch(BooksApiActions.retrievedBookList({ books })))
  }
}
