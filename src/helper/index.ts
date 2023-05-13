export const sorterAsc = (sortBy: string) => (a: any, b: any) =>
  a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;

export const sorterDesc = (sortBy: string) => (b: any, a: any) =>
  a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
