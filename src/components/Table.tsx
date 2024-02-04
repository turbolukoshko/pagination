import { FC, useEffect, useState } from "react";

import { UserType } from "../App";
import { SearchBar } from "./shared/SearchBar";
import "./Table.css";

type TableKeyType = "name" | "email" | "website";

type TableDataProps = {
  data: UserType[] | undefined;
};

enum TableKey {
  Name = "name",
  Email = "email",
  Website = "website",
}

const Table: FC<TableDataProps> = ({ data }): JSX.Element => {
  const [ascending, setAscending] = useState<boolean>(true);
  const [tableData, setTableData] = useState<UserType[] | undefined>(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sortById = () => {
    if (tableData) {
      const sortedData = ascending
        ? [...tableData].sort((a, b) => b.id - a.id)
        : [...tableData].sort((a, b) => a.id - b.id);

      setTableData(sortedData);
      setAscending(!ascending);
    }
  };

  const sortStringOfCharacters = (key: string) => {
    if (tableData) {
      const sortedData = ascending
        ? [...tableData].sort((a, b) =>
            a[key as TableKeyType].localeCompare(b[key as TableKeyType])
          )
        : [...tableData].sort((a, b) =>
            b[key as TableKeyType].localeCompare(a[key as TableKeyType])
          );

      setTableData(sortedData);
      setAscending(!ascending);
    }
  };

  return (
    <>
      <SearchBar data={data} setTableData={setTableData} />
      <div className="table__container" style={{ overflowX: "auto" }}>
        {tableData?.length ? (
          <table className="table">
            <thead className="table__header">
              <tr className="table__header-row">
                <th onClick={sortById} className="table__header-row-item">
                  ID
                </th>
                <th
                  onClick={() => sortStringOfCharacters(TableKey.Name)}
                  className="table__header-row-item"
                >
                  Name
                </th>
                <th
                  onClick={() => sortStringOfCharacters(TableKey.Email)}
                  className="table__header-row-item"
                >
                  Email
                </th>
                <th
                  onClick={() => sortStringOfCharacters(TableKey.Website)}
                  className="table__header-row-item"
                >
                  Website
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((user: UserType, idx: number) => (
                <tr key={idx} className="table__body-row">
                  <td className="table__body-row-item">{user.id}</td>
                  <td className="table__body-row-item">{user.name}</td>
                  <td className="table__body-row-item">{user.email}</td>
                  <td className="table__body-row-item">{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <p className="table__user-not-found">
              No user found with these parameters!
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Table;
