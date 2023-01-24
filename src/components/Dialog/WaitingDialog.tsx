import { FC } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const styles = require("./WaitingDialog.module.css");

interface DialogProps {
  open: boolean;
}
const WaitingDialog: FC<DialogProps> = ({ open }) => {
  const theme = useTheme();

  const fullScreenMd = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      fullScreen={fullScreenMd}
      open={open}
      keepMounted
      aria-labelledby="waiting-dialog"
      sx={{
        "& .MuiPaper-root": {
          background: "#FFD793",
          color: "black",
          border: "3px solid #93FF9E",
          borderRadius: "10px",
          padding: "10px 10px",
          margin: "10px",
        },
      }}
    >
      <DialogContent>
        <div className={styles.title}>
          Joining Table
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={styles.text}>
          This takes some seconds. you will be seated on your table soon.
        </div>
        <div className={styles.logoWrapper}>
          <Image src={"/img/bones-coin.png"} alt="Logo" layout="fill" className={styles.logoImg} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitingDialog;
