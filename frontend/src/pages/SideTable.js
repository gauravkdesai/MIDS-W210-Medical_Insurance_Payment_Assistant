import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NumericInput from 'react-numeric-input';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const tableTheme = createMuiTheme({
  typography: {
    fontSize: 20,
  },
});

function Row(props) {
  const { icd9, icd10, desc } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {icd9}
        </TableCell>
        <TableCell>{icd10}</TableCell>
        <TableCell>{desc}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable({
  chapter_disease_to_icd9_mapping,
  chapter_disease_to_icd10_mapping,
  chapter_disease_to_desc_mapping
}) {
  const icd9_array = chapter_disease_to_icd9_mapping["('001-139', 'Bacterial Infection')"]; //TODO take selected row disease from other table
  const icd10_array = chapter_disease_to_icd10_mapping["('001-139', 'Bacterial Infection')"]; //TODO take selected row disease from other table
  const desc_array = chapter_disease_to_desc_mapping["('001-139', 'Bacterial Infection')"]; //TODO take selected row disease from other table
  console.log("icd9_array=", icd9_array);

  return (
    <ThemeProvider theme={tableTheme}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  ICD 9 Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  ICD 10 Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {icd9_array.map((icd9, index) => (
              <Row key={icd9} icd9={icd9} icd10={icd10_array[index]} desc={desc_array[index]}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
