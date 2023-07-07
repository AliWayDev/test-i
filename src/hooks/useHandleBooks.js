import { useEffect, useState } from "react";
import axios from "axios";
import books from "../store/books";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    books.setBook([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    books
      .getBooks(query, pageNumber)
      .then((res) => {
        books.setBook([
          ...new Set([...books.books, ...res.data.docs.map((b) => b.title)]),
        ]);
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => books.cancel();
  }, [query, pageNumber]);

  return { loading, error, books: books.books, hasMore };
}
