import axios from "axios";
import dayjs from "dayjs";

export const handleize = (str) => {
  str = str.toLowerCase();
  const toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
  for (let i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], "");
  }
  str = str.replace(/\W+/g, "-");
  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+z/, "");
  }
  if (str.charAt(0) == "-") {
    str = str.replace(/A-+/, "");
  }
  return str;
};

export const formatDate = (date) => {
  const parsedDate = dayjs(date);
  if (parsedDate.isValid()) {
    return dayjs(date).format("DD MMM, YYYY");
  }
  return null;
};

export const formatYear = (date) => {
  const parsedDate = dayjs(date);
  if (parsedDate.isValid()) {
    return dayjs(date).format("YYYY");
  }
  return null;
};

export const fetchMultiple = (arr) =>
  Promise.all(arr.map((api) => axios.get(api))).then((responses) =>
    responses.map((response) => response.data)
  );

export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const getRandomImage = () => `/placeholders/0${getRandomInt(8)}.jpg`;

export const getImageFromId = (id) =>
  `/placeholders/0${id.toString()[id.toString().length - 1]}.jpg`;

export const getAge = (date) => {
  const today = dayjs();
  const birthday = dayjs(date);
  const diff = today.diff(birthday, "years");
  return diff;
};

export const sortTitles = (list) => {
  if (!list?.length) return list;
  const tempList = [...list];
  tempList.sort((a, b) => {
    return dayjs(a.release_date || a.first_air_date).isBefore(
      dayjs(b.release_date || b.first_air_date)
    )
      ? 1
      : -1;
  });
  console.log(tempList);
  return tempList;
};
