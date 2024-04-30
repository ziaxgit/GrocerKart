import { AsyncStorage } from "react-native";

// Function to get today's date in the format dd/mm/yyyy
const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
};

// Function to save text with today's date as the key
const saveText = async (text) => {
  try {
    const today = getTodayDate();
    await AsyncStorage.setItem(today, text);
    console.log("Text saved successfully!");
  } catch (error) {
    console.error("Error saving text:", error);
  }
};

// Example usage
const someText = "This is some text to be saved.";
saveText(someText);
