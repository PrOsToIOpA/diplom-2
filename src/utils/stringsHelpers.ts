export const concatErrorsString = (errors: any[]) =>
  Array.isArray(errors)
    ? errors.reduce((str, item) => str + item + '\n', '')
    : '';

export const stringIsNotEmpty = (str: string | any[]) =>
  typeof str === 'string' && str.length > 0;
