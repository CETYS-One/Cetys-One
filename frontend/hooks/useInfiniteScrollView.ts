import { useEffect, useState } from "react";

export const useInfiniteScrollView = <T>(
  allItems: Array<T>,
  limit: number,
  getNextCursor: (currCursor: number) => number,
  delay: number = 100
) => {
  const [_allItems, setAllItems] = useState(allItems);
  const [cursor, setCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [itemsShown, setItemsShown] = useState<T[]>([
    ..._allItems.slice(0, limit),
  ]);

  const fetchItems = () => {
    setIsLoading(true);
    const nextCursor = getNextCursor(cursor);
    setItemsShown([
      ...itemsShown,
      ..._allItems.slice(nextCursor, nextCursor + limit),
    ]);
    setCursor(nextCursor);
    setTimeout(() => setIsLoading(false), delay);
  };

  return {
    itemsShown,
    hasMorePages: _allItems.length >= cursor + limit,
    fetchItems,
    isLoading,
    setAllItems,
  };
};
