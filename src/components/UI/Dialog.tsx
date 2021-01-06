import React,{useState} from 'react';
import { withStyles,WithStyles,createStyles, Theme  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { deletePost } from "../../reducks/posts/operations";
import {useSelector,useDispatch} from "react-redux";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface PROPS {
  title: string;
  id: string;
  uid: string;
  handleClose: ()=>void
}

 const  CustomDialog:React.FC<PROPS> = (props) =>{
  const [open, setOpen] =useState(true);
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          作品の削除
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            削除されたデータは復元できません。削除してよろしいですか？
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>dispatch(deletePost(props.id,props.uid))} color="primary">
            削除する
          </Button>
</DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialog
