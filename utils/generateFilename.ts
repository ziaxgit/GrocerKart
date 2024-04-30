export const generateFilename = () => {
  // Create a new Date object for the current date and time
  const now = new Date();

  // Extract the day, month, year, hours, and minutes
  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are 0-indexed
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format if necessary
  hours = hours % 12;
  // Convert an hour of '0' to '12'
  hours = hours ? hours : 12;

  // Format the day and month to ensure they are two digits
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  // Format the hours and minutes to ensure they are two digits
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Concatenate the formatted values to form the desired format with AM/PM
  return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
};
