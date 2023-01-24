"use strict";
exports.__esModule = true;
var React = require("react");
var styles_1 = require("@mui/material/styles");
var Box_1 = require("@mui/material/Box");
var Table_1 = require("@mui/material/Table");
var TableBody_1 = require("@mui/material/TableBody");
var TableCell_1 = require("@mui/material/TableCell");
var TableContainer_1 = require("@mui/material/TableContainer");
var TableFooter_1 = require("@mui/material/TableFooter");
var TablePagination_1 = require("@mui/material/TablePagination");
var TableRow_1 = require("@mui/material/TableRow");
var Paper_1 = require("@mui/material/Paper");
var IconButton_1 = require("@mui/material/IconButton");
var FirstPage_1 = require("@mui/icons-material/FirstPage");
var KeyboardArrowLeft_1 = require("@mui/icons-material/KeyboardArrowLeft");
var KeyboardArrowRight_1 = require("@mui/icons-material/KeyboardArrowRight");
var LastPage_1 = require("@mui/icons-material/LastPage");
function TablePaginationActions(props) {
    var theme = styles_1.useTheme();
    var count = props.count, page = props.page, rowsPerPage = props.rowsPerPage, onPageChange = props.onPageChange;
    var handleFirstPageButtonClick = function (event) {
        onPageChange(event, 0);
    };
    var handleBackButtonClick = function (event) {
        onPageChange(event, page - 1);
    };
    var handleNextButtonClick = function (event) {
        onPageChange(event, page + 1);
    };
    var handleLastPageButtonClick = function (event) {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (React.createElement(Box_1["default"], { sx: { flexShrink: 0, ml: 2.5 } },
        React.createElement(IconButton_1["default"], { onClick: handleFirstPageButtonClick, disabled: page === 0, "aria-label": "first page" }, theme.direction === "rtl" ? React.createElement(LastPage_1["default"], null) : React.createElement(FirstPage_1["default"], null)),
        React.createElement(IconButton_1["default"], { onClick: handleBackButtonClick, disabled: page === 0, "aria-label": "previous page" }, theme.direction === "rtl" ? React.createElement(KeyboardArrowRight_1["default"], null) : React.createElement(KeyboardArrowLeft_1["default"], null)),
        React.createElement(IconButton_1["default"], { onClick: handleNextButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, "aria-label": "next page" }, theme.direction === "rtl" ? React.createElement(KeyboardArrowLeft_1["default"], null) : React.createElement(KeyboardArrowRight_1["default"], null)),
        React.createElement(IconButton_1["default"], { onClick: handleLastPageButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, "aria-label": "last page" }, theme.direction === "rtl" ? React.createElement(FirstPage_1["default"], null) : React.createElement(LastPage_1["default"], null))));
}
function createData(name, calories, fat) {
    return { name: name, calories: calories, fat: fat };
}
var rows = [
    createData("Cupcake", 305, 3.7),
    createData("Donut", 452, 25.0),
    createData("Eclair", 262, 16.0),
    createData("Frozen yoghurt", 159, 6.0),
    createData("Gingerbread", 356, 16.0),
    createData("Honeycomb", 408, 3.2),
    createData("Ice cream sandwich", 237, 9.0),
    createData("Jelly Bean", 375, 0.0),
    createData("KitKat", 518, 26.0),
    createData("Lollipop", 392, 0.2),
    createData("Marshmallow", 318, 0),
    createData("Nougat", 360, 19.0),
    createData("Oreo", 437, 18.0),
].sort(function (a, b) { return (a.calories < b.calories ? -1 : 1); });
function CustomPaginationActionsTable() {
    var _a = React.useState(0), page = _a[0], setPage = _a[1];
    var _b = React.useState(5), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    // Avoid a layout jump when reaching the last page with empty rows.
    var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (React.createElement(TableContainer_1["default"], { component: Paper_1["default"] },
        React.createElement(Table_1["default"], { sx: { minWidth: 500 }, "aria-label": "custom pagination table" },
            React.createElement(TableBody_1["default"], null,
                (rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows).map(function (row) { return (React.createElement(TableRow_1["default"], { key: row.name },
                    React.createElement(TableCell_1["default"], { component: "th", scope: "row" }, row.name),
                    React.createElement(TableCell_1["default"], { style: { width: 160 }, align: "right" }, row.calories),
                    React.createElement(TableCell_1["default"], { style: { width: 160 }, align: "right" }, row.fat))); }),
                emptyRows > 0 && (React.createElement(TableRow_1["default"], { style: { height: 53 * emptyRows } },
                    React.createElement(TableCell_1["default"], { colSpan: 6 })))),
            React.createElement(TableFooter_1["default"], null,
                React.createElement(TableRow_1["default"], null,
                    React.createElement(TablePagination_1["default"], { rowsPerPageOptions: [5, 10, 25, { label: "All", value: -1 }], colSpan: 3, count: rows.length, rowsPerPage: rowsPerPage, page: page, SelectProps: {
                            inputProps: {
                                "aria-label": "rows per page"
                            },
                            native: true
                        }, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage, ActionsComponent: TablePaginationActions }))))));
}
exports["default"] = CustomPaginationActionsTable;
