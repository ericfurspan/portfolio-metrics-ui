import { TextField, Stack, Button } from "@mui/material";

const InputForm = () => {
  return (
    <Stack
      alignItems="flex-start"
      spacing={2}
      component="form"
      // onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <TextField
        id="tickers-input"
        label="Ticker symbols"
        helperText="example: AAPL,MSFT,HD,PEP,MCD"
        // value={tickers}
        // onChange={(e: ChangeEvent<HTMLInputElement>) =>
        //   setTickers(e.target.value)
        // }
        InputLabelProps={{ shrink: true }}
        multiline
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disableElevation
        sx={{ alignSelf: "flex-end" }}
      >
        Start
      </Button>
    </Stack>
  );
};

export default InputForm;
