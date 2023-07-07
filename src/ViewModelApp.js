import React, { useRef, useState } from "react";

export const useViewModelApp = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const [search, setSearch] = useState("");
  const observer = useRef();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const lastBookCallBack = (loading, hasMore, node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  return { search, handleSearch, observer, lastBookCallBack, pageNumber, setPageNumber };
};
