export const getFormattedDate = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  return now.toLocaleDateString('en-US', options);
};

export const getCurrentMonthYear = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  return now.toLocaleDateString('en-US', options);
};
