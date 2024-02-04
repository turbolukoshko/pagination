import axios, { AxiosError } from "axios";
import { generatePagePagination } from "./generatePagePagination";
import { TableProps } from "../src/components/Table";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

type Query = {
  pages: TableProps[];
  totalPages: number;
};

export const fetchUsers = async (
  page: number,
  limit: number
): Promise<Query | undefined> => {
  try {
    const response = await axios.get(BASE_URL);

    const { data } = response;

    const paginatatedPages = generatePagePagination(
      data,
      page,
      limit,
      data.length
    );

    return {
      pages: paginatatedPages,
      totalPages: data.length,
    };
  } catch (e) {
    const error = e as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
