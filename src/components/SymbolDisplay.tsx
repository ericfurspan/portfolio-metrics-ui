import { IconButton, TextField, InputAdornment } from "@mui/material";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

interface SymbolDisplayProps {
  symbol: string;
  symbolIndex: number;
  onRemove: (symbol: string) => void;
}
const SymbolDisplay = ({
  symbol,
  symbolIndex,
  onRemove,
}: SymbolDisplayProps) => {
  return (
    <TextField
      label={`Symbol ${symbolIndex + 1}`}
      defaultValue={symbol}
      variant="outlined"
      size="small"
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="remove symbol"
              color="error"
              size="small"
              onClick={() => onRemove(symbol)}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SymbolDisplay;
