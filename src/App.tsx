import { useState } from "react";
import { AppBar, Toolbar, Stack, Typography } from "@mui/material";
import { InputForm, ResultsTable } from "./components";
import { fetchMetrics } from "./api";

/**
 * TODO:
 *  Our standard API call frequency is 5 calls per minute and 500 calls per day.
 *    Please visit https://www.alphavantage.co/premium/ if you would like to target
 *    a higher API call frequency
 * column grouping for ResultsTable: https://mui.com/material-ui/react-table/#column-grouping
 * accept input to set queryFunction
 */

function App() {
  const [tickers, setTickers] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetchMetrics({ symbols: tickers.split(", ") });
      setResults(response);
    } catch (e) {
      console.error(e);
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

      <Stack alignItems="center" spacing={3} width="100%">
        <Typography variant="h6" component="h1">
          Analyze a list of stocks
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Stack width="100%" maxWidth="sm">
              <InputForm
                value={tickers}
                setValue={setTickers}
                handleSubmit={handleSubmit}
              />
            </Stack>

            {results && (
              <Stack padding={4}>
                <ResultsTable results={results} />
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
