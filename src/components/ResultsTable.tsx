import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableCellProps,
} from '@mui/material';
import { OverviewResults } from '../interfaces/OverviewResults';
import { formatCurrency, formatPercentage } from '../utils';

const columns: {
  key: keyof OverviewResults;
  name: OverviewResults['Name'];
  align?: TableCellProps['align'];
  format?: (value: string) => string;
}[] = [
  { key: 'Name', name: 'Name' },
  { key: 'Industry', name: 'Industry', align: 'right' },
  {
    key: 'MarketCapitalization',
    name: 'Market Cap',
    align: 'right',
    format: (value: string) => formatCurrency(value, 'compact'),
  },
  { key: 'PERatio', name: 'PE Ratio', align: 'right' },
  { key: 'PEGRatio', name: 'PEG Ratio', align: 'right' },
  { key: 'EPS', name: 'EPS', align: 'right' },
  {
    key: 'DividendYield',
    name: 'Dividend Yield',
    align: 'right',
    format: (value: string) => formatPercentage(value),
  },
  { key: 'AnalystTargetPrice', name: 'Analyst Target Price', align: 'right' },
];

// TODO: better handling of invalid records due to API limiting
// consider sorting and putting invalid records at the end of the table
// or removing them from the table and displaying and error about failed symbols

interface ResultsTableProps {
  results: OverviewResults[];
}
const ResultsTable = ({ results }: ResultsTableProps) => {
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="results table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align} sx={{ fontWeight: 500 }}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {results.map((result, index) => {
              const isInvalid = !result.Name;

              return (
                <TableRow key={isInvalid ? `invalid-row-${index}` : result.Name}>
                  {columns.map((column) => {
                    const value = String(result[column.key]);

                    return (
                      <TableCell key={column.name || `invalid-cell-${index}`} align={column.align}>
                        {isInvalid ? 'N/A' : column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResultsTable;
