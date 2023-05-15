import React, { useContext, useMemo, useState } from "react";
import { StateContext } from "../contexts/StateContext";
import Flag from "./Flag";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const Countries = (props: Props) => {
  const { countries, rowsPerPage, setRowsPerPage } = useContext(StateContext);

  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("country");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createSortHandler =
    (property: keyof Data, sortable: boolean) =>
    (event: React.MouseEvent<unknown>) => {
      if (sortable) {
        handleRequestSort(event, property);
      }
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = countries
    ? stableSort(countries, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";
  interface Data {
    country: string;
    alpha_two_code: string;
    flag: string;
    count: number;
  }
  interface Column {
    id: keyof Data;
    label: string;
    minWidth?: number;
    align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
    numeric: boolean;
    sortable: boolean;
  }

  const columns: readonly Column[] = [
    {
      id: "country",
      label: "Country",
      minWidth: 170,
      numeric: false,
      sortable: true,
    },
    {
      id: "alpha_two_code",
      label: "ISO\u00a0Code",
      minWidth: 100,
      align: "center",
      numeric: false,
      sortable: true,
    },
    {
      id: "flag",
      label: "Flag",
      minWidth: 170,
      align: "center",
      numeric: false,
      sortable: false,
    },
    {
      id: "count",
      label: "Number of universities",
      minWidth: 170,
      align: "center",
      numeric: true,
      sortable: true,
    },
  ];

  if (visibleRows.length === 0)
    return (
      <Box
        sx={{
          width: "80%",
          height: "100%",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        <CircularProgress
          sx={{
            marginLeft: "50%",
            marginTop: "50%",
          }}
        />
      </Box>
    );

  return (
    <Paper sx={{ width: "80%", overflow: "hidden", margin: "auto" }}>
      <TableContainer sx={{ height: "calc(100% - 50px);" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={createSortHandler(column.id, column.sortable)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    <>{column.label}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((country, i: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={`c${i}`}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "flag" ? (
                          <Flag
                            code={String(country.alpha_two_code)}
                            country={String(country.country)}
                          />
                        ) : (
                          country[column.id]
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 30]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
        sx={{ maxHeight: 80 }}
      />
    </Paper>
  );
};

export default Countries;
