import { ChangeEvent } from "react";
import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

interface SymbolInputProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit: (event: any) => void;
  disabled: boolean;
}

const SymbolInput = ({
  value,
  setValue,
  handleSubmit,
  disabled,
}: SymbolInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.toUpperCase());
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      variant={disabled ? "outlined" : "elevation"}
      sx={{
        p: "3px 6px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="e.g. AAPL"
        inputProps={{ "aria-label": "enter ticker symbol" }}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        fullWidth
      />
      <Divider sx={{ height: 25, m: 0.75 }} orientation="vertical" />
      <IconButton
        type="submit"
        aria-label="add ticker"
        color="primary"
        disabled={disabled}
      >
        <AddCircleOutlinedIcon />
      </IconButton>
    </Paper>
  );
};

export default SymbolInput;
