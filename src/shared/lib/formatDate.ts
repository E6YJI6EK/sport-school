export const formatDate = (dateString: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  // @ts-ignore
  const formattedDate = date.toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const formatDateWithTime = (dateString: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric"};
  // @ts-ignore
  const formattedDate = date.toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const formatDateOnlyTime = (dateString: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const options = { hour: "numeric", minute: "numeric" };
  // @ts-ignore
  const formattedTime = date.toLocaleTimeString("ru-RU", options);
  return formattedTime;
};
