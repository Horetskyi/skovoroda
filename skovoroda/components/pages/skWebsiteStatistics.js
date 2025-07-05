import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography, CircularProgress } from '@mui/material';

const apiMetadata = {
  properties: [
    {
      key: 'downloadsByTextId',
      name: 'Завантаження (згруповано за твором)',
      label1: 'Твір',
      label2: 'Завантаження',
    },
    {
      key: 'downloadsByFileName',
      name: 'Завантаження (згруповано за файлом)',
      label1: 'Файл',
      label2: 'Завантаження',
    },
    {
      key: 'downloadsByFileExtension',
      name: 'Завантаження (згруповано за розширенням файлу)',
      label1: 'Розширення файлу',
      label2: 'Завантаження',
    },
    {
      key: 'downloadsByDevice',
      name: 'Завантаження (згруповано за пристроєм)',
      label1: 'Пристрій',
      label2: 'Завантаження',
    },
    {
      key: 'downloadsByDay',
      name: 'Завантаження по днях',
      label1: 'Дата',
      label2: 'Завантаження',
      isLineChart: true,
    },
  ]
}

function sortDataByCount(chart) {
  if (!chart || !Array.isArray(chart.labels) || !Array.isArray(chart.counts)) {
    return chart;
  }
  const pairs = chart.labels.map((label, i) => [label, chart.counts[i]]);
  pairs.sort((a, b) => b[1] - a[1]);
  chart.labels = pairs.map(pair => pair[0]);
  chart.counts = pairs.map(pair => pair[1]);
  return chart;
}

function prepareApiData(data) {
  if (!data) {
    return data;
  }
  apiMetadata.properties.forEach(prop => {
    if (prop.key === 'downloadsByDay') {
      data[prop.key].labels = data[prop.key].labels.map(date => new Date(date));
      // For downloadsByDay, keep order as is (ascending by date)
    } else {
      sortDataByCount(data[prop.key]);
    }
  });
  return data;
}

function SingleChart(chart, prop) {
  const hasData = chart && Array.isArray(chart.labels) && chart.labels.length > 0;

  return <Box mb={6} key={prop.key}>
    <Typography variant="h6">{prop.name}</Typography>
    {hasData ? (
      prop.isLineChart ? (
        <LineChart
          xAxis={[{ data: chart.labels, scaleType: 'utc', label: prop.label1 }]}
          series={[{ data: chart.counts, label: prop.label2 }]}
          height={300}
        />
      ) : (
        <BarChart
          xAxis={[{ data: chart.labels, label: prop.label1 }]}
          series={[{ data: chart.counts, label: prop.label2 }]}
          height={300}
        />
      )
    ) : (
      <Typography>No data available for {prop.name}</Typography>
    )}
  </Box>
}

const SkWebsiteStatistics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/website_statistics')
      .then((res) => res.json())
      .then((data) => {
        prepareApiData(data);
        setData(data);
        console.log('Website statistics data:', data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  // Calculate total downloads
  const totalDownloads = data.downloadsByDay && Array.isArray(data.downloadsByDay.counts)
    ? data.downloadsByDay.counts.reduce((sum, n) => sum + n, 0)
    : 0;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Website Download Statistics
      </Typography>
      <Box mb={4}>
        <Typography variant="h2" color="primary" fontWeight={700}>
          {totalDownloads}
        </Typography>
        <Typography variant="subtitle1">Загальна кількість завантажень</Typography>
      </Box>
      { apiMetadata.properties.map((prop) => SingleChart(data[prop.key], prop))}
    </Box>
  );
};

export default SkWebsiteStatistics;
