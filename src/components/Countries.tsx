import React, { useContext, useState } from "react";
import { StateContext } from "../contexts/StateContext";
import Flag from "./Flag";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

type Props = {};

const Countries = (props: Props) => {
  const { countries, rowsPerPage, setRowsPerPage } = useContext(StateContext);

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  interface Column {
    id: "country" | "alpha_two_code" | "flag" | "count";
    label: string;
    minWidth?: number;
    align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  }

  const columns: readonly Column[] = [
    { id: "country", label: "Country", minWidth: 170 },
    {
      id: "alpha_two_code",
      label: "ISO\u00a0Code",
      minWidth: 100,
      align: "center",
    },
    {
      id: "flag",
      label: "Flag",
      minWidth: 170,
      align: "center",
    },
    {
      id: "count",
      label: "Number of universities",
      minWidth: 170,
      align: "center",
    },
  ];

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
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country: CountryType, i: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`c${i}`}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "flag" ? (
                            <Flag
                              code={country.alpha_two_code}
                              country={country.country}
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
