import { Stack, IconButton, TextField } from "@mui/material";
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
    <Stack direction="row" alignItems="center" spacing={1} key={symbol}>
      <TextField
        label={`Symbol ${symbolIndex + 1}`}
        defaultValue={symbol}
        InputProps={{ readOnly: true }}
        variant="standard"
        size="small"
      />
      <IconButton
        aria-label="remove symbol"
        color="error"
        size="small"
        onClick={() => onRemove(symbol)}
      >
        <DeleteOutlineOutlined />
      </IconButton>
    </Stack>
  );
};

export default SymbolDisplay;
