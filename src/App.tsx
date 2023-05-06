import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import InputForm from "./components/InputForm";
// import InputForm from "./components/InputFormAlt";

function App() {
  const [tickers, setTickers] = useState("");

  console.log("tickers:", tickers);

  return (
    <Container maxWidth="md" sx={{ pt: 8 }}>
      <Stack spacing={3}>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Analyze a list of stocks
        </Typography>

        <InputForm value={tickers} setValue={setTickers} />
      </Stack>
    </Container>
  );
}

export default App;
