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
 * add a "how it works" section
 * add input to select queryFunction
 * input validation/sanitation
 * table sorting
 * table column grouping - https://mui.com/material-ui/react-table/#column-grouping
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

      <Stack alignItems="flex-start" p={3}>
        <Typography variant="subtitle2">Enter a symbol</Typography>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <Stack spacing={4}>
              <Stack spacing={1}>
                <SymbolInput
                  value={symbolInput}
                  setValue={setSymbolInput}
                  handleSubmit={handleSubmitSymbol}
                  disabled={activeSymbols.length >= 5}
                />

                <Typography variant="caption" alignSelf="flex-end">
                  {`${5 - activeSymbols.length} symbol(s) remaining`}
                </Typography>
              </Stack>

              {activeSymbols.length > 0 && (
                <>
                  <Stack spacing={3}>
                    {activeSymbols.map((symbol, index) => (
                      <SymbolDisplay
                        key={symbol}
                        symbol={symbol}
                        symbolIndex={index}
                        onRemove={(symbol) => handleRemoveSymbol(symbol)}
                      />
                    ))}
                  </Stack>

                  <Button
                    variant="contained"
                    onClick={handleStartAnalysis}
                    endIcon={<QueryStatsIcon />}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Analyze
                  </Button>
                </>
              )}
            </Stack>

            {results && (
              <Stack alignSelf="center" marginTop={4} padding={4}>
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
