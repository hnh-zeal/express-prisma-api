type SqlObject = {
  values: any[];
  strings: string[];
};

export const stringifyQuery = (sqlObj: SqlObject): string => {
  const { values, strings } = sqlObj;
  return strings.map((str, i) => `${str}${values[i] !== undefined ? JSON.stringify(values[i]) : ''}`).join('');
};
