export const getCurrentTimeFromOffset = (utcOffset: string): string => {
  try {
    if (utcOffset === "UTC") {
      // If offset is "UTC", return current UTC time directly
      return new Date().toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }

    // Extract the sign (+/-) and hours/minutes from UTC offset
    const match = RegExp(/UTC([+-])(\d{2}):(\d{2})/).exec(utcOffset);
    if (!match) throw new Error("Invalid UTC format");

    const sign = match[1] === "+" ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);

    // Get current UTC time
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;

    // Apply offset
    const offsetMilliseconds = sign * ((hours * 60 + minutes) * 60000);
    const localTime = new Date(utcTime + offsetMilliseconds);

    // Format time in HH:MM:SS AM/PM
    return localTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error parsing UTC offset:", error);
    return "Invalid Timezone";
  }
};

// Helper function to check if input is a number (timezone)
export const isNumeric = (value: string) => !isNaN(Number(value));
