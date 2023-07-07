import axios from "axios";
import { makeAutoObservable } from "mobx";

class Book {
  books = [];
  cancel;

  constructor() {
    makeAutoObservable(this);
  }

  setBook(value) {
    this.books = value;
  }

  getBooks(query, pageNumber) {
    return axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (this.cancel = c)),
    });
  }
}

export default new Book();
