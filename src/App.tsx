import { useState } from "react";
import { AppBar, Toolbar, Stack, Typography, Button } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import {
  ResultsTable,
  Spinner,
  SymbolDisplay,
  SymbolInput,
} from "./components";
import { fetchMetrics } from "./api";

/**
 * TODO:
 * column grouping for ResultsTable: https://mui.com/material-ui/react-table/#column-grouping
 * accept input to set queryFunction
 */

function App() {
  const [symbolInput, setSymbolInput] = useState("");
  const [activeSymbols, setActiveSymbols] = useState<string[]>([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartAnalysis = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetchMetrics({ symbols: activeSymbols });
      setResults(response);
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSymbol = (event: any) => {
    event.preventDefault();

    if (activeSymbols.includes(symbolInput)) return setSymbolInput("");

    setActiveSymbols([...activeSymbols, symbolInput]);
    setSymbolInput("");
  };

  const handleRemoveSymbol = (ticker: string) => {
    const updatedSymbols = activeSymbols.filter((t) => t !== ticker);
    setActiveSymbols(updatedSymbols);
  };

  return (
    <Stack spacing={3}>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Portfolio Metrics
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack p={3}>
        <Typography variant="subtitle1" gutterBottom>
          Enter up to 5 stock symbols
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing={4}>
              {activeSymbols.length < 5 && (
                <SymbolInput
                  value={symbolInput}
                  setValue={setSymbolInput}
                  handleSubmit={handleSubmitSymbol}
                />
              )}

              <Stack alignItems="flex-start" spacing={3}>
                {activeSymbols.map((symbol, index) => (
                  <SymbolDisplay
                    symbol={symbol}
                    symbolIndex={index}
                    onRemove={(symbol) => handleRemoveSymbol(symbol)}
                  />
                ))}
              </Stack>

              {activeSymbols.length > 0 && (
                <Button
                  variant="contained"
                  onClick={handleStartAnalysis}
                  endIcon={<QueryStatsIcon />}
                  size="large"
                  sx={{ alignSelf: "flex-start" }}
                >
                  Analyze Portfolio
                </Button>
              )}
            </Stack>

            {results && (
              <Stack marginTop={4} padding={4}>
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
