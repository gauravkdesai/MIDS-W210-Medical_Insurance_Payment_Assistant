import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, desc, prob, diseasesArray) {
  return {
    name,
    desc,
    prob,
    diseases:diseasesArray,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.desc}</TableCell>
        <TableCell align="right">{row.value}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Diseases
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ICD 9 Codes</TableCell>
                    <TableCell>ICD 10 Codes</TableCell>
                    <TableCell align="right">Probability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.children.map((diseasesRow) => (
                    <TableRow key={diseasesRow.name}>
                      <TableCell component="th" scope="row">
                        {diseasesRow.name}
                      </TableCell>
                      <TableCell>{diseasesRow.icd9}</TableCell>
                      <TableCell>{diseasesRow.icd10}</TableCell>
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
    diseases: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        prob: PropTypes.number.isRequired,
        icd9: PropTypes.string,
        icd10: PropTypes.string,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    prob: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

// const rows = [
//   createData('Adverse', 'Adverse', 1.0,  [
//     {"name": "Constipation", "prob": 0.011777997}, 
//     {"name": "Diarrhea", "prob": 0.010553241}, 
//     {"name": "Edema", "prob": 0.017568767}, 
//     {"name": "Hypercholesterolemia ", "prob": 0.29133314}, 
//     {"name": "Hyperglycemia", "prob": 0.20892414}, 
//     {"name": "Thrombocytopenia", "prob": 0.045878142}, 
//     {"name": "Others", "prob": 0.021608412}, 
//     {"name": "Any", "prob": 0.47839156}
//   ]   )
// ];

export default function CollapsibleTable({codesHierarchyData}) {
    console.log("codesHierarchyData=",codesHierarchyData);
    var adverse = codesHierarchyData["children"][0];
    var chapters = codesHierarchyData["children"][1]["children"];
    console.log("adverse=",adverse);
    console.log("chapters=",chapters);
    var rows = Array.from(chapters);
    rows.unshift(adverse);
    
    console.log("rows=",rows);
  return (

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Chapter</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Probability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}