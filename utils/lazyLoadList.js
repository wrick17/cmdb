import { useRef, useState } from "react";

export const useLazyListData = (data = []) => {
  const [list, setList] = useState(data.slice(0, 6));
  const firstTime = useRef(true);

  const onScroll = () => {
    if (!firstTime.current) return;
    firstTime.current = false;
    setList(data);
  };

  return { list, onScroll };
};
