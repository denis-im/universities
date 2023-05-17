import React, { useContext } from "react";
import { StateContext } from "../contexts/StateContext";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Flag from "./Flag";

type MyCellProps = {
  children: React.ReactNode;
};

const MyCell: React.FC<MyCellProps> = ({ children }) => (
  <TableCell
    align={"center"}
    sx={{
      borderBottom: "none",
    }}
  >
    {children}
  </TableCell>
);

type Props = {};

const University = (props: Props) => {
  const { allData } = useContext(StateContext);
  const { uni } = useParams();
  const university = allData[uni!];

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
    <Paper
      sx={{
        width: "500px",
        overflow: "hidden",
        margin: "auto",
        height: "100%",
        marginTop: 7,
      }}
    >
      <TableContainer sx={{ height: "calc(100% - 50px);" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align={"center"} style={{ minWidth: 170 }}>
                Country
              </TableCell>
              <TableCell align={"center"} style={{ minWidth: 170 }}>
                {university.country}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <MyCell>ISO code</MyCell>
              <MyCell>{university.alpha_two_code}</MyCell>
            </TableRow>
            <TableRow>
              <MyCell>Flag</MyCell>
              <MyCell>
                <Flag
                  code={university.alpha_two_code}
                  country={university.country}
                />
              </MyCell>
            </TableRow>
            {university["state-province"] ? (
              <TableRow>
                <MyCell>State or province</MyCell>
                <MyCell>{university["state-province"]}</MyCell>
              </TableRow>
            ) : null}
            <TableRow>
              <MyCell>Univesity</MyCell>
              <MyCell>{university.name}</MyCell>
            </TableRow>
            <TableRow>
              <MyCell>Domains</MyCell>
              <MyCell>{university.domains.join(", ")}</MyCell>
            </TableRow>
            {university.web_pages.map((url: string, i: number) => (
              <TableRow key={i}>
                <MyCell>Web page {i + 1}</MyCell>
                <MyCell>
                  <a
                    href={`${String(university.web_pages[i])}`}
                    rel="noreferrer"
                    target="_blank"
                  >{`${String(university.web_pages[i])}`}</a>
                </MyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default University;
