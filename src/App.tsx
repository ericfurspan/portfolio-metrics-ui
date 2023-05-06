import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { wait } from "./utils";
import InputForm from "./components/InputForm";

function App() {
  const [tickers, setTickers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      await wait(2000);
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 8 }}>
      <Stack spacing={3}>
        <Typography variant="h6" component="h1">
          Analyze a list of stocks
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <InputForm
            value={tickers}
            setValue={setTickers}
            handleSubmit={handleSubmit}
          />
        )}
      </Stack>
    </Container>
  );
}

export default App;
