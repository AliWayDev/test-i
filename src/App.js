import React, { useCallback } from "react";
import useBookSearch from "./hooks/useHandleBooks";
import { useViewModelApp } from "./ViewModelApp";

const App = () => {
  const { handleSearch, search, lastBookCallBack, pageNumber } =
    useViewModelApp();

  const { books, hasMore, loading, error } = useBookSearch(search, pageNumber);

  const lastBookElementRef = useCallback(
    (node) => lastBookCallBack(loading, hasMore, node),
    [loading, hasMore]
  );

  const booksJsx = books?.map((book, index) => {
    if (books?.length === index + 1) {
      return (
        <li ref={lastBookElementRef} key={book}>
          {book}
        </li>
      );
    } else {
      return <li key={book}>{book}</li>;
    }
  });

  return (
    <>
      <input
        className="m-5 border-[1px] border-gray-900 p-3 rounded-sm"
        placeholder="Search Book Name"
        type="text"
        value={search}
        onChange={handleSearch}
      ></input>
      <p className="pl-5 text-2xl">Try - "test"</p>
      <ol className="ml-5">{booksJsx}</ol>
      <div className="text-2xl text-center text-red-600">
        {loading && "Loading..."}
      </div>
      <div>{error && "Error"}</div>
    </>
  );
};

export default App;
