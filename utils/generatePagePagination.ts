import { UserType } from './../src/App';

export const generatePagePagination = (
  data: UserType[],
  page: number,
  limit: number,
  maxLength: number
): UserType[] => {
  const pages: UserType[] = [];
  const startIndex = (page - 1) * limit;
  const customIndex = startIndex + limit;
  const endIndex = customIndex < maxLength ? customIndex : maxLength;

  for (let i = startIndex; i < endIndex; i++) {
    pages.push(data[i]);
  }

  return pages;
};
