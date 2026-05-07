const {
  subMinutes,
  subHours,
  subDays,
  subMonths,
  subYears
} = require("date-fns");

const parsePostedTime = (rawTime) => {
  if (!rawTime) return new Date();

  const text = rawTime.toLowerCase().trim();

  if (text === "just now") return new Date();
  if (text === "yesterday") return subDays(new Date(), 1);

  const match = text.match(/(\d+)\s*(minute|hour|day|month|year)s?\s*ago/);
  if (!match) return new Date();

  const value = Number(match[1]);
  const unit = match[2];

  const map = {
    minute: subMinutes,
    hour: subHours,
    day: subDays,
    month: subMonths,
    year: subYears
  };

  return map[unit] ? map[unit](new Date(), value) : new Date();
};

module.exports = { parsePostedTime };