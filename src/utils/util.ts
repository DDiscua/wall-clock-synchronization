// Format a Date object as "HH:mm:ss"
const formatTime = (date: Date): string => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
};

const getSecondClockTime = (time: Date): Date => {
  const offset = 1 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000; // 1 hour, 15 minutes, 30 seconds
  return new Date(time.getTime() + offset);
};

const transformTime = (manualTime: string, currentTime?: Date) => {
  const [hours, minutes, seconds] = manualTime.split(":").map(Number);
  if (currentTime) {
    const newDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      hours,
      minutes,
      seconds
    );
    return newDate;
  }
  const newDate = new Date(new Date().setHours(hours, minutes, seconds, 0));
  return newDate;
};

// Function to calculate time difference in "HH:mm:ss" format
const calculateTimeDifference = (time1: string, time2: string): string => {
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

  const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
  const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

  const timeDifferenceInSeconds = Math.abs(totalSeconds1 - totalSeconds2);
  const hoursDiff = Math.floor(timeDifferenceInSeconds / 3600);
  const minutesDiff = Math.floor((timeDifferenceInSeconds % 3600) / 60);
  const secondsDiff = timeDifferenceInSeconds % 60;

  return `${String(hoursDiff).padStart(2, "0")}:${String(minutesDiff).padStart(
    2,
    "0"
  )}:${String(secondsDiff).padStart(2, "0")}`;
};

const validateTime = (time?: string): boolean => {
  if (!time) {
    return false;
  }
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return false;
  }

  const [hours, minutes, seconds] = time.split(":").map(Number);
  if (hours < 0 || hours > 23) {
    return false;
  }
  if (minutes < 0 || minutes > 59) {
    return false;
  }
  if (seconds < 0 || seconds > 59) {
    return false;
  }
  return true;
};

export {
  formatTime,
  transformTime,
  getSecondClockTime,
  calculateTimeDifference,
  validateTime,
};
