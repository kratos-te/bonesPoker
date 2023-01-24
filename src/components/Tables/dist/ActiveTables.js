"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var React = require("react");
var clsx_1 = require("clsx");
var styles_1 = require("@mui/material/styles");
var TableCell_1 = require("@mui/material/TableCell");
var Paper_1 = require("@mui/material/Paper");
var react_virtualized_1 = require("react-virtualized");
var classes = {
    flexContainer: "ReactVirtualizedDemo-flexContainer",
    tableRow: "ReactVirtualizedDemo-tableRow",
    tableRowHover: "ReactVirtualizedDemo-tableRowHover",
    tableCell: "ReactVirtualizedDemo-tableCell",
    noClick: "ReactVirtualizedDemo-noClick"
};
var styles = function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {
            // temporary right-to-left patch, waiting for
            // https://github.com/bvaughn/react-virtualized/issues/454
            "& .ReactVirtualized__Table__headerRow": __assign(__assign({}, (theme.direction === "rtl" && {
                paddingLeft: "0 !important"
            })), (theme.direction !== "rtl" && {
                paddingRight: undefined
            }))
        },
        _b["& ." + classes.flexContainer] = {
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box"
        },
        _b["& ." + classes.tableRow] = {
            cursor: "pointer"
        },
        _b["& ." + classes.tableRowHover] = {
            "&:hover": {
                backgroundColor: theme.palette.grey[200]
            }
        },
        _b["& ." + classes.tableCell] = {
            flex: 1
        },
        _b["& ." + classes.noClick] = {
            cursor: "initial"
        },
        _b);
};
var MuiVirtualizedTable = /** @class */ (function (_super) {
    __extends(MuiVirtualizedTable, _super);
    function MuiVirtualizedTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRowClassName = function (_a) {
            var _b;
            var index = _a.index;
            var onRowClick = _this.props.onRowClick;
            return clsx_1["default"](classes.tableRow, classes.flexContainer, (_b = {},
                _b[classes.tableRowHover] = index !== -1 && onRowClick != null,
                _b));
        };
        _this.cellRenderer = function (_a) {
            var _b;
            var cellData = _a.cellData, columnIndex = _a.columnIndex;
            var _c = _this.props, columns = _c.columns, rowHeight = _c.rowHeight, onRowClick = _c.onRowClick;
            return (React.createElement(TableCell_1["default"], { component: "div", className: clsx_1["default"](classes.tableCell, classes.flexContainer, (_b = {},
                    _b[classes.noClick] = onRowClick == null,
                    _b)), variant: "body", style: { height: rowHeight }, align: (columnIndex != null && columns[columnIndex].numeric) || false ? "right" : "left" }, cellData));
        };
        _this.headerRenderer = function (_a) {
            var label = _a.label, columnIndex = _a.columnIndex;
            var _b = _this.props, headerHeight = _b.headerHeight, columns = _b.columns;
            return (React.createElement(TableCell_1["default"], { component: "div", className: clsx_1["default"](classes.tableCell, classes.flexContainer, classes.noClick), variant: "head", style: { height: headerHeight }, align: columns[columnIndex].numeric || false ? "right" : "left" },
                React.createElement("span", null, label)));
        };
        return _this;
    }
    MuiVirtualizedTable.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, rowHeight = _a.rowHeight, headerHeight = _a.headerHeight, tableProps = __rest(_a, ["columns", "rowHeight", "headerHeight"]);
        return (React.createElement(react_virtualized_1.AutoSizer, null, function (_a) {
            var height = _a.height, width = _a.width;
            return (React.createElement(react_virtualized_1.Table, __assign({ height: height, width: width, rowHeight: rowHeight, gridStyle: {
                    direction: "inherit"
                }, headerHeight: headerHeight }, tableProps, { rowClassName: _this.getRowClassName }), columns.map(function (_a, index) {
                var dataKey = _a.dataKey, other = __rest(_a, ["dataKey"]);
                return (React.createElement(react_virtualized_1.Column, __assign({ key: dataKey, headerRenderer: function (headerProps) {
                        return _this.headerRenderer(__assign(__assign({}, headerProps), { columnIndex: index }));
                    }, className: classes.flexContainer, cellRenderer: _this.cellRenderer, dataKey: dataKey }, other)));
            })));
        }));
    };
    MuiVirtualizedTable.defaultProps = {
        headerHeight: 48,
        rowHeight: 48
    };
    return MuiVirtualizedTable;
}(React.PureComponent));
var VirtualizedTable = styles_1.styled(MuiVirtualizedTable)(styles);
var sample = [
    ["Frozen yoghurt", 159, 6.0, 24, 4.0],
    ["Ice cream sandwich", 237, 9.0, 37, 4.3],
    ["Eclair", 262, 16.0, 24, 6.0],
    ["Cupcake", 305, 3.7, 67, 4.3],
    ["Gingerbread", 356, 16.0, 49, 3.9],
];
function createData(id, dessert, calories, fat, carbs, protein) {
    return { id: id, dessert: dessert, calories: calories, fat: fat, carbs: carbs, protein: protein };
}
var rows = [];
for (var i = 0; i < 200; i += 1) {
    var randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData.apply(void 0, __spreadArrays([i], randomSelection)));
}
function ReactVirtualizedTable() {
    return (React.createElement(Paper_1["default"], { style: { height: 400, width: "100%" } },
        React.createElement(VirtualizedTable, { rowCount: rows.length, rowGetter: function (_a) {
                var index = _a.index;
                return rows[index];
            }, columns: [
                {
                    width: 200,
                    label: "Dessert",
                    dataKey: "dessert"
                },
                {
                    width: 120,
                    label: "Calories\u00A0(g)",
                    dataKey: "calories",
                    numeric: true
                },
                {
                    width: 120,
                    label: "Fat\u00A0(g)",
                    dataKey: "fat",
                    numeric: true
                },
                {
                    width: 120,
                    label: "Carbs\u00A0(g)",
                    dataKey: "carbs",
                    numeric: true
                },
                {
                    width: 120,
                    label: "Protein\u00A0(g)",
                    dataKey: "protein",
                    numeric: true
                },
            ] })));
}
exports["default"] = ReactVirtualizedTable;
