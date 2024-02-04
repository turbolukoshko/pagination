import { useState } from "react";
import { useQuery } from "react-query";

import Table from "./components/Table";
import { fetchUsers } from "../utils/fetchUsers";
import { Loader } from "./components/shared/Loader";
import { Pagination } from "./components/Pagination";
import { ErrorPage } from "./components/ErrorPage";
import "./App.css";

type UserData = {
  pages: UserType[];
  totalPages: number;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

function App() {
  const paginationLimit = 3;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useQuery<UserData | undefined>({
    queryKey: ["fetchUsers", page, "limit", paginationLimit],
    queryFn: () => fetchUsers(page, paginationLimit),
  });

  if (isLoading && !error) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="main">
      <Table data={data?.pages} />
      <Pagination
        activePage={page}
        itemsCount={data?.totalPages}
        limit={paginationLimit}
        onPageChange={setPage}
      />
    </div>
  );
}

export default App;
