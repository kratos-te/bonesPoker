/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS examples components
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableTournament from "../../data/dataTableTournament";

function TournamentTable(): JSX.Element {
  return (
    <MDBox my={3}>
      <DataTable table={dataTableTournament} entriesPerPage={false} />
    </MDBox>
  );
}

export default TournamentTable;
