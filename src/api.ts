import { QueryFunction } from './interfaces/QueryFunction';

/**
 * Calls the `portfolio-metrics-api` serverless function 'metrics' hosted in Netlify
 * see: https://app.netlify.com/sites/portfolio-metrics-api/functions
 */
export const fetchMetrics = async ({
  symbols,
  queryFunction = 'OVERVIEW',
}: {
  symbols: string[];
  queryFunction?: QueryFunction;
}) => {
  const response = await fetch(
    'https://portfolio-metrics-api.netlify.app/.netlify/functions/metrics',
    {
      method: 'POST',
      body: JSON.stringify({
        queryFunction,
        symbols,
      }),
    },
  );

  const data = await response.json();

  return data;
};
