import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const DialogContent = withStyles((theme) => ({
  root: {

    padding: theme.spacing(2),

  },
}))(MuiDialogContent);

interface PROPS {
  title: string;
}

const ModalOpen:React.FC<PROPS>= (props) => {
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >

        <DialogContent dividers>
          <Typography gutterBottom>
             {props.title}
          </Typography>

        </DialogContent>

      </Dialog>
    </div>
  );
}

export default ModalOpen
