import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  FormControl: {
    marginBottom: 16,
    minWidth: 128,
    width: "100%",
  },
});

interface PROPS {
  options: {
    id: string;
    name: string;
  }[];
  select: any;
  label: string;
  value: string;
  required: boolean;
}


const SelectBox: React.FC<PROPS> = (props) => {
  const classes = useStyle();
  return (
    <FormControl className={classes.FormControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {/* 全体にmapを適用するわけではないので、すぐに{}で囲わないように注意する。 */}
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
