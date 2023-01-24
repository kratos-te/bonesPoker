"use strict";
/* eslint-disable prettier/prettier */
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
// react-table components
var react_table_1 = require("react-table");
// @mui material components
var Table_1 = require("@mui/material/Table");
var TableBody_1 = require("@mui/material/TableBody");
var TableContainer_1 = require("@mui/material/TableContainer");
var TableRow_1 = require("@mui/material/TableRow");
var Icon_1 = require("@mui/material/Icon");
var Autocomplete_1 = require("@mui/material/Autocomplete");
// Material Dashboard 2 PRO React TS components
var MDBox_1 = require("components/MDBox");
var MDTypography_1 = require("components/MDTypography");
var MDInput_1 = require("components/MDInput");
var MDPagination_1 = require("components/MDPagination");
// Material Dashboard 2 PRO React TS examples components
var DataTableHeadCell_1 = require("examples/Tables/DataTable/DataTableHeadCell");
var DataTableBodyCell_1 = require("examples/Tables/DataTable/DataTableBodyCell");
// table,
var DataTable = function (_a) {
    var entriesPerPage = _a.entriesPerPage, canSearch = _a.canSearch, showTotalEntries = _a.showTotalEntries, tableColumns = _a.tableColumns, tableRows = _a.tableRows, pagination = _a.pagination, isSorted = _a.isSorted, noEndBorder = _a.noEndBorder, buyInFilter = _a.buyInFilter, setLoading = _a.setLoading, loading = _a.loading, afkGamelist = _a.afkGamelist;
    var defaultValue;
    var entries;
    if (entriesPerPage) {
        defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : "10";
        entries = entriesPerPage.entries ? entriesPerPage.entries : ["10", "25", "50", "100"];
    }
    // const columns = useMemo<any>(() => table.columns, [table]);
    // const data = useMemo<any>(() => table.rows, [table]);
    var tableInstance = react_table_1.useTable({
        columns: tableColumns,
        data: tableRows,
        initialState: { pageIndex: 0 }
    }, react_table_1.useGlobalFilter, react_table_1.useSortBy, react_table_1.usePagination);
    var getTableProps = tableInstance.getTableProps, getTableBodyProps = tableInstance.getTableBodyProps, headerGroups = tableInstance.headerGroups, prepareRow = tableInstance.prepareRow, rows = tableInstance.rows, page = tableInstance.page, pageOptions = tableInstance.pageOptions, canPreviousPage = tableInstance.canPreviousPage, canNextPage = tableInstance.canNextPage, gotoPage = tableInstance.gotoPage, nextPage = tableInstance.nextPage, previousPage = tableInstance.previousPage, setPageSize = tableInstance.setPageSize, setGlobalFilter = tableInstance.setGlobalFilter, _b = tableInstance.state, pageIndex = _b.pageIndex, pageSize = _b.pageSize, globalFilter = _b.globalFilter;
    // Set the default value for the entries per page when component mounts
    react_1.useEffect(function () { return setPageSize(defaultValue || 10); }, [defaultValue]);
    // Set the entries per page value based on the select value
    var setEntriesPerPage = function (value) { return setPageSize(value); };
    // Render the paginations
    var renderPagination = pageOptions.map(function (option) { return (React.createElement(MDPagination_1["default"], { item: true, key: option, onClick: function () { return gotoPage(Number(option)); }, active: pageIndex === option }, option + 1)); });
    // Handler for the input to set the pagination index
    var handleInputPagination = function (_a) {
        var value = _a.target.value;
        return value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));
    };
    // Customized page options starting from 1
    var customizedPageOptions = pageOptions.map(function (option) { return option + 1; });
    // Setting value for the pagination input
    var handleInputPaginationValue = function (_a) {
        var value = _a.target;
        return gotoPage(Number(value.value - 1));
    };
    // Search input value state
    var _c = react_1.useState(globalFilter), search = _c[0], setSearch = _c[1];
    // Search input state handle
    var onSearchChange = react_table_1.useAsyncDebounce(function (value) {
        setGlobalFilter(value || undefined);
    }, 100);
    // A function that sets the sorted value for the table
    var setSortedValue = function (column) {
        var sortedValue;
        if (isSorted && column.isSorted) {
            sortedValue = column.isSortedDesc ? "desc" : "asce";
        }
        else if (isSorted) {
            sortedValue = "none";
        }
        else {
            sortedValue = false;
        }
        return sortedValue;
    };
    // Setting the entries starting point
    var entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;
    // Setting the entries ending point
    var entriesEnd;
    if (pageIndex === 0) {
        entriesEnd = pageSize;
    }
    else if (pageIndex === pageOptions.length - 1) {
        entriesEnd = rows.length;
    }
    else {
        entriesEnd = pageSize * (pageIndex + 1);
    }
    return (React.createElement(TableContainer_1["default"], { sx: { boxShadow: "none" } },
        entriesPerPage || canSearch ? (React.createElement(MDBox_1["default"], { display: "flex", justifyContent: "space-between", alignItems: "center", p: 3 },
            entriesPerPage && (React.createElement(MDBox_1["default"], { display: "flex", alignItems: "center" },
                React.createElement(Autocomplete_1["default"], { disableClearable: true, value: pageSize.toString(), options: entries, onChange: function (event, newValue) {
                        setEntriesPerPage(parseInt(newValue, 10));
                    }, size: "small", sx: { width: "5rem" }, renderInput: function (params) { return React.createElement(MDInput_1["default"], __assign({}, params)); } }),
                React.createElement(MDTypography_1["default"], { variant: "caption", color: "secondary" }, "\u00A0\u00A0entries per page"))),
            canSearch && (React.createElement(MDBox_1["default"], { width: "12rem", ml: "auto" },
                React.createElement(MDInput_1["default"], { placeholder: "Search...", value: search, size: "small", fullWidth: true, onChange: function (_a) {
                        var currentTarget = _a.currentTarget;
                        setSearch(search);
                        onSearchChange(currentTarget.value);
                    } }))))) : null,
        React.createElement(Table_1["default"], __assign({}, getTableProps()),
            React.createElement(MDBox_1["default"], { component: "thead" }, headerGroups.map(function (headerGroup, key) { return (React.createElement(TableRow_1["default"], __assign({ hover: true, key: key }, headerGroup.getHeaderGroupProps()), headerGroup.headers.map(function (column, key) { return (React.createElement(DataTableHeadCell_1["default"], __assign({ key: key }, column.getHeaderProps(isSorted && column.getSortByToggleProps()), { width: column.width ? column.width : "auto", align: column.align ? column.align : "left", sorted: setSortedValue(column) }), column.render("Header"))); }))); })),
            React.createElement(TableBody_1["default"], __assign({}, getTableBodyProps()), page.map(function (row, key) {
                prepareRow(row);
                return (React.createElement(TableRow_1["default"], __assign({ hover: true, 
                    //style={{
                    //backgroundColor: "rgba(234, 242, 215)",
                    //color: "white",
                    //}}
                    key: key }, row.getRowProps()), row.cells.map(function (cell, key) { return (React.createElement(DataTableBodyCell_1["default"], __assign({ key: key, noBorder: noEndBorder && rows.length - 1 === key, align: cell.column.align ? cell.column.align : "left" }, cell.getCellProps()), cell.render("Cell"))); })));
            }))),
        React.createElement(MDBox_1["default"], { display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, p: !showTotalEntries && pageOptions.length === 1 ? 0 : 3 },
            React.createElement(MDBox_1["default"], { mb: { xs: 3, sm: 0 } }),
            pageOptions.length > 1 && (React.createElement(MDPagination_1["default"], { variant: pagination.variant ? pagination.variant : "gradient", color: pagination.color ? pagination.color : "info" },
                canPreviousPage && (React.createElement(MDPagination_1["default"], { item: true, onClick: function () { return previousPage(); } },
                    React.createElement(Icon_1["default"], { sx: { fontWeight: "bold" } }, "chevron_left"))),
                renderPagination.length > 6 ? (React.createElement(MDBox_1["default"], { width: "5rem", mx: 1 },
                    React.createElement(MDInput_1["default"], { inputProps: { type: "number", min: 1, max: customizedPageOptions.length }, value: customizedPageOptions[pageIndex], onChange: function (event) {
                            handleInputPagination(event);
                            handleInputPaginationValue(event);
                        } }))) : (renderPagination),
                canNextPage && (React.createElement(MDPagination_1["default"], { item: true, onClick: function () { return nextPage(); } },
                    React.createElement(Icon_1["default"], { sx: { fontWeight: "bold" } }, "chevron_right"))))))));
};
// Declaring default props for DataTable
DataTable.defaultProps = {
    entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
    canSearch: false,
    showTotalEntries: true,
    pagination: { variant: "gradient", color: "warning" },
    isSorted: true,
    noEndBorder: false
};
exports["default"] = DataTable;
