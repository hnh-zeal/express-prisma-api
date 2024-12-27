let currentLocale: string = 'en'; // Default locale

export const setLocale = (locale: string) => {
  currentLocale = locale;
};

export const getLocale = (req?: any): string => {
  if (req) {
    return req.locale || 'en';
  }

  return currentLocale;
};
