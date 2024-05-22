import { createReducer, on } from "@ngrx/store";
import { Book } from "../book-list/book";
import { BooksApiActions } from "./books.actions";

export const initialState: ReadonlyArray<Book> = []

// handle the retrieval of the book list from the state and consequently, update the state.

export const booksReducer = createReducer(initialState, on(BooksApiActions.retrievedBookList, (_state, { books }) => books))