import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Book } from "./book";

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
    private httpClient = inject(HttpClient)
    getBooks(): Observable<Array<Book>> {
        return this.httpClient.get<{ items: Book[] }>('https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks')
            .pipe(map((books) => books.items || []))
    }
}