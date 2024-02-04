import { FC } from "react";

import { TableProps } from "../Table";
import { SearchIcon } from "./SearchIcon";
import "./SearchBar.css";

type SearchBarProps = {
  data: TableProps[] | undefined;
  setTableData: (data: TableProps[]) => void;
};

export const SearchBar: FC<SearchBarProps> = ({
  data,
  setTableData,
}): JSX.Element => {
  const searchSort = (name: string) => {
    if (data) {
      const sortedData = [...data].filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );

      setTableData(sortedData);

      name.length ? setTableData(sortedData) : setTableData(data);
    }
  };

  return (
    <>
      <div className="searchbar__container">
        <p className="searchbar__header">Users</p>
        <div className="searchbar">
          <input
            type="text"
            onChange={(e) => searchSort(e.target.value)}
            className="searchbar__input"
            placeholder="Search by Name"
          />
          <span className="searchbar__icon">
            <SearchIcon />
          </span>
        </div>
      </div>
    </>
  );
};
