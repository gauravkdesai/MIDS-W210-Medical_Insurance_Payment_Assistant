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
  const { row, labelDescrtiion, labelToicd10Mapping, labelDisplayName, diseaseICDMapping } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {labelDisplayName[row.name]}
        </TableCell>
        <TableCell>{labelToicd10Mapping[row.name]}</TableCell>
        <TableCell>{labelDescrtiion[row.name]}</TableCell>
        <TableCell align="right">{row.value}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Diseases
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ICD 9 Code</TableCell>
                    <TableCell>ICD 10 Code</TableCell>
                    <TableCell align="right">Probability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.children.map((diseasesRow) => (
                    <TableRow key={diseasesRow.name}>
                      <TableCell component="th" scope="row">
                        {diseasesRow.name}
                      </TableCell>
                      <TableCell>{typeof diseaseICDMapping[diseasesRow.name] !== "undefined" ? diseaseICDMapping[diseasesRow.name][0]:""}</TableCell>
                      <TableCell>{typeof diseaseICDMapping[diseasesRow.name] !== "undefined" ? diseaseICDMapping[diseasesRow.name][1]:""}</TableCell>
                      <TableCell align="right">{diseasesRow.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        icd9: PropTypes.string,
        icd10: PropTypes.string,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    desc: PropTypes.string,
  }).isRequired,
};

export default function CollapsibleTable({
  codesHierarchyData,
  labelDescrtiion,
  labelToicd10Mapping,
  labelDisplayName,
  diseaseICDMapping,
  threshold,
  predictionOutputThis
}) {
  console.log("codesHierarchyData=", codesHierarchyData);
  const rows = codesHierarchyData["children"];
  console.log("rows=", rows);

  return (
    <ThemeProvider theme={tableTheme}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  ICD 9 Chapter/s
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  ICD 10 Chapter/s
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" gutterBottom>
                  Probability
                </Typography>
                <div className="probthreshold">
                  <label>> </label>
                  <NumericInput min={0} max={1} step={0.05} value={threshold} onChange={newThreshold => predictionOutputThis.setThreshold(newThreshold)}/>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} labelDescrtiion={labelDescrtiion} labelToicd10Mapping={labelToicd10Mapping} labelDisplayName={labelDisplayName} diseaseICDMapping={diseaseICDMapping}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
