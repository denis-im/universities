import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../contexts/StateContext";
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
import { Typography } from "@mui/material";
import { getComparator, stableSort } from "../helper";
import SearchBox from "./SearchBox";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

type UniversityType = {
  id: number;
  domain: string;
  "state-province": string;
  web_page: string;
  name: string;
};

const CountryToUniversity = (c: CountryType): UniversityType => {
  return {
    id: c.id,
    name: c.name ?? "",
    domain: c.domains![0] ?? "",
    "state-province": c["state-province"] ?? "",
    web_page: c.web_pages![0] ?? "",
  };
};

const filterData = (allData: CountryType[], code: string): UniversityType[] => {
  return allData
    .filter((c: CountryType) => c.alpha_two_code === code)
    .map(CountryToUniversity);
};

const Universities = (props: Props) => {
  const { code } = useParams();
  const { allData, rowsPerPage, setRowsPerPage } = useContext(StateContext);

  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [data, setData] = React.useState(filterData(allData, code!));
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const navigate = useNavigate();

  useEffect(() => {
    const newData = allData.filter((c: CountryType) =>
      c.name!.toLowerCase().includes(searchTerm)
    );
    setData(filterData(newData, code!));
    setPage(0);
  }, [searchTerm, allData, code]);

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

  const visibleRows = data
    ? stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

  interface Data {
    domain: string;
    "state-province": string;
    web_page: string;
    name: string;
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
      id: "name",
      label: "Name",
      minWidth: 170,
      numeric: false,
      sortable: true,
    },
    {
      id: "state-province",
      label: "State or province",
      minWidth: 170,
      align: "center",
      numeric: false,
      sortable: true,
    },
    {
      id: "domain",
      label: "Domain",
      minWidth: 170,
      align: "center",
      numeric: false,
      sortable: true,
    },
    {
      id: "web_page",
      label: "Web page",
      minWidth: 170,
      align: "center",
      numeric: false,
      sortable: true,
    },
  ];

  if (allData.length === 0)
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
        sx={{
          width: "80%",
          overflow: "hidden",
          margin: "auto",
          height: "100%",
        }}
      >
        {visibleRows.length === 0 ? (
          <Typography
            sx={{
              marginLeft: "40%",
              marginTop: "10%",
            }}
            variant="h5"
          >
            No university has "{searchTerm}" in name
          </Typography>
        ) : (
          <>
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
                            onClick={createSortHandler(
                              column.id,
                              column.sortable
                            )}
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
                  {visibleRows.map((university, i: number) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`c${i}`}
                        onClick={() => navigate(`/${code}/${university.id}`)}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "web_page" ? (
                                <a
                                  href={`${String(university.web_page)}`}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {university[column.id]}
                                </a>
                              ) : (
                                university[column.id]
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
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton
              showLastButton
              sx={{ maxHeight: 80 }}
            />
          </>
        )}
      </Paper>
    </>
  );
};

export default Universities;
