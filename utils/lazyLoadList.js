// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

export const useLazyListData = (data = []) => {
  // const route = useSelector((state) => state.route);
  // const [list, setList] = useState(data.slice(0, 5));

  // useEffect(() => {
  //   if (data.length) {
  //     const timeout = setTimeout(
  //       (d) => {
  //         setList(d);
  //       },
  //       1000,
  //       data
  //     );

  //     return () => clearTimeout(timeout);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (route.routing) {
  //     setList(data.slice(0, 5));
  //   }
  // }, [route.routing]);

  return data;
};
