import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DailyPriceChart = ({ invoices }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const processChartData = () => {
      const uniqueDates = [...new Set(invoices.map((invoice) => invoice.time_in))];
      const totalPriceByDate = uniqueDates.map((date) => {
        const invoicesOnDate = invoices.filter((invoice) => invoice.time_in === date);
        const total = invoicesOnDate.reduce((acc, curr) => acc + curr.price, 0);
        return total;
      });

      setChartOptions({
        xaxis: {
          categories: uniqueDates,
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#9C27B0"], // Customize the colors here
      });

      setChartSeries([
        {
          name: "Total Price",
          data: totalPriceByDate,
        },
      ]);
    };

    processChartData();
  }, [invoices]);

  return (
    <div>
      <h2>Daily Total Price Chart</h2>
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default DailyPriceChart;
