import { useState } from "react";
import { AppBar, Toolbar, Stack, Typography } from "@mui/material";
import InputForm from "./components/InputForm";
import { fetchMetrics } from "./api";

function App() {
  const [tickers, setTickers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetchMetrics({ symbols: ["AAPL"] });

      console.log("response", response);
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={4}>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Portfolio Metrics
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack
        spacing={3}
        alignSelf="center"
        sx={{ width: "100%", maxWidth: "sm", padding: 3 }}
      >
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
    </Stack>
  );
}

export default App;
