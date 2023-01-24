"use strict";
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
// import styles from "./CreateTableDialog.module.css";
var Dialog_1 = require("@mui/material/Dialog");
var DialogContent_1 = require("@mui/material/DialogContent");
var useMediaQuery_1 = require("@mui/material/useMediaQuery");
var styles_1 = require("@mui/material/styles");
var ToggleButton_1 = require("@mui/material/ToggleButton");
var ToggleButtonGroup_1 = require("@mui/material/ToggleButtonGroup");
var TemplateTable_1 = require("../../types/TemplateTable");
var dayjs_1 = require("dayjs");
var TextField_1 = require("@mui/material/TextField");
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var AdapterDayjs_1 = require("@mui/x-date-pickers/AdapterDayjs");
var DateTimePicker_1 = require("@mui/x-date-pickers/DateTimePicker");
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
var styles = require("./CreateTableDialog.module.css");
var CreateTableDialog = function (_a) {
    var open = _a.open, onClose = _a.onClose, editId = _a.editId, editName = _a.editName, editNumSeats = _a.editNumSeats, editInitialStack = _a.editInitialStack, editMinBet = _a.editMinBet, editBuyIn = _a.editBuyIn, blindIncreaseMode = _a.blindIncreaseMode, blindIncreaseRound = _a.blindIncreaseRound, blindIncreaseTime = _a.blindIncreaseTime, handleInputEditNameChange = _a.handleInputEditNameChange, handleInputNumSeatsChange = _a.handleInputNumSeatsChange, handleInputInitialStackChange = _a.handleInputInitialStackChange, handleInputBlindsChange = _a.handleInputBlindsChange, handleInputBuyinChange = _a.handleInputBuyinChange, addNewTable = _a.addNewTable, handleBlindIncreaseModeChange = _a.handleBlindIncreaseModeChange, handleBlindIncreaseRoundChange = _a.handleBlindIncreaseRoundChange, handleBlindIncreaseTimeChange = _a.handleBlindIncreaseTimeChange, gameMode = _a.gameMode, handleGameModeChange = _a.handleGameModeChange, editTournamentStartedAt = _a.editTournamentStartedAt, setEditTournamentStartedAt = _a.setEditTournamentStartedAt, editTournamentEnterAt = _a.editTournamentEnterAt, setEditTournamentEnterAt = _a.setEditTournamentEnterAt, editTournamentNumSeats = _a.editTournamentNumSeats, handleInputTournamentNumSeatsChange = _a.handleInputTournamentNumSeatsChange;
    var theme = styles_1.useTheme();
    var fullScreenMd = useMediaQuery_1["default"](theme.breakpoints.down("xs"));
    return (React.createElement(Dialog_1["default"], { fullScreen: fullScreenMd, open: open, onClose: function () { return onClose(); }, "aria-labelledby": "create-table-dialog", sx: {
            "& .MuiPaper-root": {
                background: "black",
                color: "white",
                border: "5px solid #93FF9E",
                borderRadius: "10px",
                padding: "10px 10px",
                margin: "10px"
            }
        } },
        React.createElement(DialogContent_1["default"], null,
            React.createElement("div", { className: styles.row },
                React.createElement("span", { className: styles.label }, "Type"),
                React.createElement("div", { className: styles.inputWrapper },
                    React.createElement(ToggleButtonGroup_1["default"], { color: "success", sx: {
                            "& .MuiToggleButton-root": {
                                border: "1px solid green",
                                background: "green",
                                color: "black"
                            },
                            "& .MuiToggleButton-root:hover": {
                                background: "green"
                            },
                            "& .Mui-selected": {
                                background: "#93FF9E !important",
                                color: "black !important"
                            }
                        }, value: gameMode, exclusive: true, onChange: handleGameModeChange },
                        React.createElement(ToggleButton_1["default"], { value: TemplateTable_1.GameModes.TABLE }, TemplateTable_1.GameModes.TABLE),
                        React.createElement(ToggleButton_1["default"], { value: TemplateTable_1.GameModes.TOURNAMENT }, TemplateTable_1.GameModes.TOURNAMENT)))),
            gameMode == TemplateTable_1.GameModes.TABLE && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "table name"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Name", value: editName, type: "text", onChange: function (e) { return handleInputEditNameChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "max seats"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Max Seats", value: editNumSeats, type: "number", max: 10, min: 2, onChange: function (e) { return handleInputNumSeatsChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "stack"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Stack", value: editInitialStack, type: "number", onChange: function (e) { return handleInputInitialStackChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "blinds"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Blinds", value: editMinBet, type: "number", onChange: function (e) { return handleInputBlindsChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Buy in"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "BuyIn", value: editBuyIn, type: "number", onChange: function (e) { return handleInputBuyinChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Blind Increase *2"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement(ToggleButtonGroup_1["default"], { color: "success", sx: {
                                "& .MuiToggleButton-root": {
                                    border: "1px solid green",
                                    background: "green",
                                    color: "black"
                                },
                                "& .MuiToggleButton-root:hover": {
                                    background: "green"
                                },
                                "& .Mui-selected": {
                                    background: "#93FF9E !important",
                                    color: "black !important"
                                }
                            }, value: blindIncreaseMode, exclusive: true, onChange: handleBlindIncreaseModeChange },
                            React.createElement(ToggleButton_1["default"], { value: "time" }, "By Time"),
                            React.createElement(ToggleButton_1["default"], { value: "round" }, "By Round")))),
                blindIncreaseMode == "round" && (React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Blind Increase Round By"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Blind Increase Round By", value: blindIncreaseRound, type: "number", onChange: function (e) { return handleBlindIncreaseRoundChange(e.target.value); }, className: styles.input })))),
                blindIncreaseMode == "time" && (React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Blind Increase Time By (mins)"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Blind Increase Round By", value: blindIncreaseTime, type: "number", onChange: function (e) { return handleBlindIncreaseTimeChange(e.target.value); }, className: styles.input })))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.btn + " " + styles.bgGreen, onClick: function () { return addNewTable(); } }, "+ host")))),
            gameMode == TemplateTable_1.GameModes.TOURNAMENT && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "table name"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Name", value: editName, type: "text", onChange: function (e) { return handleInputEditNameChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Max Tournament Players"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Max Seats", value: editTournamentNumSeats, type: "number", max: 10, min: 2, onChange: function (e) { return handleInputTournamentNumSeatsChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Max Table Players"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Max Seats", value: editNumSeats, type: "number", max: 10, min: 2, onChange: function (e) { return handleInputNumSeatsChange(e.target.value); }, className: styles.input }))),
                React.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDayjs_1.AdapterDayjs },
                    React.createElement("div", { className: styles.row },
                        React.createElement("span", { className: styles.label }, "Enter Time"),
                        React.createElement("div", { className: styles.inputWrapper },
                            React.createElement(DateTimePicker_1.DateTimePicker, { renderInput: function (params) { return React.createElement(TextField_1["default"], __assign({}, params)); }, minDateTime: dayjs_1["default"](new Date().toString()), value: editTournamentEnterAt, onChange: function (newValue) { return setEditTournamentEnterAt(newValue); } }))),
                    React.createElement("div", { className: styles.row },
                        React.createElement("span", { className: styles.label }, "Start Time"),
                        React.createElement("div", { className: styles.inputWrapper },
                            React.createElement(DateTimePicker_1.DateTimePicker, { renderInput: function (params) { return React.createElement(TextField_1["default"], __assign({}, params)); }, minDateTime: dayjs_1["default"](new Date().toString()), value: editTournamentStartedAt, onChange: function (newValue) { return setEditTournamentStartedAt(newValue); } })))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "stack"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Stack", value: editInitialStack, type: "number", onChange: function (e) { return handleInputInitialStackChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "blinds"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Blinds", value: editMinBet, type: "number", onChange: function (e) { return handleInputBlindsChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Buy in"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "BuyIn", value: editBuyIn, type: "number", onChange: function (e) { return handleInputBuyinChange(e.target.value); }, className: styles.input }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Blind Increase *2"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement(ToggleButtonGroup_1["default"], { color: "success", sx: {
                                "& .MuiToggleButton-root": {
                                    border: "1px solid green",
                                    background: "green",
                                    color: "black"
                                },
                                "& .MuiToggleButton-root:hover": {
                                    background: "green"
                                },
                                "& .Mui-selected": {
                                    background: "#93FF9E !important",
                                    color: "black !important"
                                }
                            }, value: blindIncreaseMode, exclusive: true, onChange: handleBlindIncreaseModeChange },
                            React.createElement(ToggleButton_1["default"], { value: "time" }, "By Time"),
                            React.createElement(ToggleButton_1["default"], { value: "round" }, "By Round")))),
                blindIncreaseMode == "round" && (React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Blind Increase Round By"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Blind Increase Round By", value: blindIncreaseRound, type: "number", onChange: function (e) { return handleBlindIncreaseRoundChange(e.target.value); }, className: styles.input })))),
                blindIncreaseMode == "time" && (React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.label }, "Blind Increase Time By (mins)"),
                    React.createElement("div", { className: styles.inputWrapper },
                        React.createElement("input", { placeholder: "Blind Increase Round By", value: blindIncreaseTime, type: "number", onChange: function (e) { return handleBlindIncreaseTimeChange(e.target.value); }, className: styles.input })))),
                React.createElement("div", { className: styles.row },
                    React.createElement("span", { className: styles.btn + " " + styles.bgGreen, onClick: function () { return addNewTable(); } }, "+ host")))))));
};
exports["default"] = CreateTableDialog;
