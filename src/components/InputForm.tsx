import { ChangeEvent } from "react";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

interface InputFormProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit: (event: any) => void;
}

const InputForm = ({ value, setValue, handleSubmit }: InputFormProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "3px 6px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="e.g. AAPL, MSFT, WMT"
        inputProps={{ "aria-label": "enter ticker symbols" }}
        value={value}
        onChange={handleChange}
        fullWidth
      />
      <Divider sx={{ height: 28, m: 0.75 }} orientation="vertical" />
      <IconButton
        type="submit"
        aria-label="start ticker analysis"
        color="info"
        size="large"
      >
        <QueryStatsIcon />
      </IconButton>
    </Paper>
  );
};

export default InputForm;
