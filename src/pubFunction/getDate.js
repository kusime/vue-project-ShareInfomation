const formatWrapper = (raw) => {
  if (raw < 10) {
    return `0${String(raw)}`;
  }
  return raw;
};

export default function () {
  let current = new Date();
  let cDate =
    current.getFullYear() +
    "-" +
    formatWrapper(current.getMonth() + 1) +
    "-" +
    current.getDate();
  let cTime =
    formatWrapper(current.getHours()) +
    ":" +
    formatWrapper(current.getMinutes()) +
    ":" +
    formatWrapper(current.getSeconds());
  return cDate + " " + cTime;
}
