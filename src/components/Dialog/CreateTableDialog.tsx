import { FC } from "react";
// import styles from "./CreateTableDialog.module.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { colors } from "@mui/material";
import { GameModes } from "../../types/TemplateTable";

import dayjs, { Dayjs } from "dayjs";
import TextField, { TextFieldProps } from "@mui/material/TextField";

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
const styles = require("./CreateTableDialog.module.css");

interface DialogProps {
  open: boolean;
  onClose: Function;
  editId: string;
  editName: string;
  editNumSeats: number;
  editInitialStack: number;
  editMinBet: number;
  editBuyIn: number;
  blindIncreaseMode: string;
  blindIncreaseTime: number;
  blindIncreaseRound: number;
  handleInputEditNameChange: Function;
  handleInputNumSeatsChange: Function;
  handleInputInitialStackChange: Function;
  handleInputBlindsChange: Function;
  handleInputBuyinChange: Function;
  addNewTable: Function;
  handleBlindIncreaseModeChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void;
  handleBlindIncreaseTimeChange: Function;
  handleBlindIncreaseRoundChange: Function;

  gameMode: GameModes;
  handleGameModeChange: (event: React.MouseEvent<HTMLElement>, newAlignment: GameModes) => void;

  editTournamentStartedAt: Dayjs;
  setEditTournamentStartedAt: Function;
  editTournamentEnterAt: Dayjs;
  setEditTournamentEnterAt: Function;
  editTournamentNumSeats: number;
  handleInputTournamentNumSeatsChange: Function;
}
const CreateTableDialog: FC<DialogProps> = ({
  open,
  onClose,
  editId,
  editName,
  editNumSeats,
  editInitialStack,
  editMinBet,
  editBuyIn,
  blindIncreaseMode,
  blindIncreaseRound,
  blindIncreaseTime,
  handleInputEditNameChange,
  handleInputNumSeatsChange,
  handleInputInitialStackChange,
  handleInputBlindsChange,
  handleInputBuyinChange,
  addNewTable,
  handleBlindIncreaseModeChange,
  handleBlindIncreaseRoundChange,
  handleBlindIncreaseTimeChange,
  gameMode,
  handleGameModeChange,
  editTournamentStartedAt,
  setEditTournamentStartedAt,
  editTournamentEnterAt,
  setEditTournamentEnterAt,
  editTournamentNumSeats,
  handleInputTournamentNumSeatsChange,
}) => {
  const theme = useTheme();
  const fullScreenMd = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      fullScreen={fullScreenMd}
      open={open}
      onClose={() => onClose()}
      aria-labelledby="create-table-dialog"
      sx={{
        "& .MuiPaper-root": {
          background: "black",
          color: "white",
          border: "5px solid #93FF9E",
          borderRadius: "10px",
          padding: "10px 10px",
          margin: "10px",
        },
      }}
    >
      <DialogContent>
        <div className={styles.row}>
          <span className={styles.label}>Type</span>
          <div className={styles.inputWrapper}>
            <ToggleButtonGroup
              color="success"
              sx={{
                "& .MuiToggleButton-root": {
                  border: "1px solid green",
                  background: "green",
                  color: "black",
                },
                "& .MuiToggleButton-root:hover": {
                  background: "green",
                },
                "& .Mui-selected": {
                  background: "#93FF9E !important",
                  color: "black !important",
                },
              }}
              value={gameMode}
              exclusive
              onChange={handleGameModeChange}
            >
              <ToggleButton value={GameModes.TABLE}>{GameModes.TABLE}</ToggleButton>
              <ToggleButton value={GameModes.TOURNAMENT}>{GameModes.TOURNAMENT}</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {gameMode == GameModes.TABLE && (
          <>
            <div className={styles.row}>
              <span className={styles.label}>table name</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Name"
                  value={editName}
                  type="text"
                  onChange={(e) => handleInputEditNameChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>max seats</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Max Seats"
                  value={editNumSeats}
                  type="number"
                  max={10}
                  min={2}
                  onChange={(e) => handleInputNumSeatsChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>stack</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Stack"
                  value={editInitialStack}
                  type="number"
                  onChange={(e) => handleInputInitialStackChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>blinds</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Blinds"
                  value={editMinBet}
                  type="number"
                  onChange={(e) => handleInputBlindsChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Buy in</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="BuyIn"
                  value={editBuyIn}
                  type="number"
                  onChange={(e) => handleInputBuyinChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Blind Increase *2</span>
              <div className={styles.inputWrapper}>
                <ToggleButtonGroup
                  color="success"
                  sx={{
                    "& .MuiToggleButton-root": {
                      border: "1px solid green",
                      background: "green",
                      color: "black",
                    },
                    "& .MuiToggleButton-root:hover": {
                      background: "green",
                    },
                    "& .Mui-selected": {
                      background: "#93FF9E !important",
                      color: "black !important",
                    },
                  }}
                  value={blindIncreaseMode}
                  exclusive
                  onChange={handleBlindIncreaseModeChange}
                >
                  <ToggleButton value="time">By Time</ToggleButton>
                  <ToggleButton value="round">By Round</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {blindIncreaseMode == "round" && (
              <div className={styles.row}>
                <span className={styles.label}>Blind Increase Round By</span>
                <div className={styles.inputWrapper}>
                  <input
                    placeholder="Blind Increase Round By"
                    value={blindIncreaseRound}
                    type="number"
                    onChange={(e) => handleBlindIncreaseRoundChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            )}
            {blindIncreaseMode == "time" && (
              <div className={styles.row}>
                <span className={styles.label}>Blind Increase Time By (mins)</span>
                <div className={styles.inputWrapper}>
                  <input
                    placeholder="Blind Increase Round By"
                    value={blindIncreaseTime}
                    type="number"
                    onChange={(e) => handleBlindIncreaseTimeChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            )}
            <div className={styles.row}>
              <span className={`${styles.btn} ${styles.bgGreen}`} onClick={() => addNewTable()}>
                + host
              </span>
            </div>
          </>
        )}
        {gameMode == GameModes.TOURNAMENT && (
          <>
            <div className={styles.row}>
              <span className={styles.label}>table name</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Name"
                  value={editName}
                  type="text"
                  onChange={(e) => handleInputEditNameChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Max Tournament Players</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Max Seats"
                  value={editTournamentNumSeats}
                  type="number"
                  max={10}
                  min={2}
                  onChange={(e) => handleInputTournamentNumSeatsChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Max Table Players</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Max Seats"
                  value={editNumSeats}
                  type="number"
                  max={10}
                  min={2}
                  onChange={(e) => handleInputNumSeatsChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className={styles.row}>
                <span className={styles.label}>Enter Time</span>
                <div className={styles.inputWrapper}>
                  <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    minDateTime={dayjs(new Date().toString())}
                    value={editTournamentEnterAt}
                    onChange={(newValue) => setEditTournamentEnterAt(newValue)}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.label}>Start Time</span>
                <div className={styles.inputWrapper}>
                  <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    minDateTime={dayjs(new Date().toString())}
                    value={editTournamentStartedAt}
                    onChange={(newValue) => setEditTournamentStartedAt(newValue)}
                  />
                </div>
              </div>
            </LocalizationProvider>
            <div className={styles.row}>
              <span className={styles.label}>stack</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Stack"
                  value={editInitialStack}
                  type="number"
                  onChange={(e) => handleInputInitialStackChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>blinds</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="Blinds"
                  value={editMinBet}
                  type="number"
                  onChange={(e) => handleInputBlindsChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Buy in</span>
              <div className={styles.inputWrapper}>
                <input
                  placeholder="BuyIn"
                  value={editBuyIn}
                  type="number"
                  onChange={(e) => handleInputBuyinChange(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Blind Increase *2</span>
              <div className={styles.inputWrapper}>
                <ToggleButtonGroup
                  color="success"
                  sx={{
                    "& .MuiToggleButton-root": {
                      border: "1px solid green",
                      background: "green",
                      color: "black",
                    },
                    "& .MuiToggleButton-root:hover": {
                      background: "green",
                    },
                    "& .Mui-selected": {
                      background: "#93FF9E !important",
                      color: "black !important",
                    },
                  }}
                  value={blindIncreaseMode}
                  exclusive
                  onChange={handleBlindIncreaseModeChange}
                >
                  <ToggleButton value="time">By Time</ToggleButton>
                  <ToggleButton value="round">By Round</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {blindIncreaseMode == "round" && (
              <div className={styles.row}>
                <span className={styles.label}>Blind Increase Round By</span>
                <div className={styles.inputWrapper}>
                  <input
                    placeholder="Blind Increase Round By"
                    value={blindIncreaseRound}
                    type="number"
                    onChange={(e) => handleBlindIncreaseRoundChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            )}
            {blindIncreaseMode == "time" && (
              <div className={styles.row}>
                <span className={styles.label}>Blind Increase Time By (mins)</span>
                <div className={styles.inputWrapper}>
                  <input
                    placeholder="Blind Increase Round By"
                    value={blindIncreaseTime}
                    type="number"
                    onChange={(e) => handleBlindIncreaseTimeChange(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            )}
            <div className={styles.row}>
              <span className={`${styles.btn} ${styles.bgGreen}`} onClick={() => addNewTable()}>
                + host
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTableDialog;
