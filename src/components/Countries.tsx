import React, { useContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { getComparator, stableSort } from "../helper";
import SearchBox from "./SearchBox";

type Props = {};

const Countries = (props: Props) => {
  const { countries, rowsPerPage, setRowsPerPage } = useContext(StateContext);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [countriesFiltered, setCountriesFiltered] = React.useState(countries);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("country");
  const navigate = useNavigate();

  useEffect(() => {
    setCountriesFiltered(
      countries.filter((c: CountryType) =>
        c.country.toLowerCase().includes(searchTerm)
      )
    );
    setPage(0);
  }, [searchTerm, countries]);

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

  const visibleRows = countriesFiltered
    ? stableSort(countriesFiltered, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

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
            marginTop: "30%",
          }}
        />
      </Box>
    );

  return (
    <>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Paper
        sx={{ width: "80%", overflow: "hidden", margin: "auto", marginTop: 2 }}
      >
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`c${i}`}
                    onClick={() => navigate(`/${country.alpha_two_code}`)}
                  >
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
          count={countriesFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
          sx={{ maxHeight: 80 }}
        />
      </Paper>
    </>
  );
};

export default Countries;
