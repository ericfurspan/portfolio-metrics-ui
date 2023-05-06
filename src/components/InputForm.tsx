import { ChangeEvent } from "react";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import {
  Paper,
  IconButton,
  InputBase,
  Divider,
  Typography,
} from "@mui/material";

interface InputFormProps {
  value: string;
  setValue: (v: string) => void;
}

const InputForm = ({ value, setValue }: InputFormProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "3px 6px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="e.g. AAPL, MSFT, HD"
        inputProps={{ "aria-label": "enter ticker symbols" }}
        value={value}
        onChange={handleChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton aria-label="start ticker analysis" color="info" size="large">
        <QueryStatsIcon />
      </IconButton>
    </Paper>
  );
};

export default InputForm;
