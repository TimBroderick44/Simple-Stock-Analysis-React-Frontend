import { useEffect, useState, useRef, MutableRefObject } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { StockData } from "../../../../types/stockData/StockData";
import style from "./DailyAverage.module.scss";
import "../../../../chartConfig";

function DailyAverage() {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    fetch("/api/daily_avg")
      .then((response) => response.json())
      .then((data: StockData[]) => {
        const labels = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.date);
        const appleDataClose = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.avg_close);
        const microsoftDataClose = data
          .filter((item) => item.stock_symbol === "MSFT")
          .map((item) => item.avg_close);
        const appleDataOpen = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.avg_open);
        const microsoftDataOpen = data
          .filter((item) => item.stock_symbol === "MSFT")
          .map((item) => item.avg_open);
        const appleDataHigh = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.avg_high);
        const microsoftDataHigh = data
          .filter((item) => item.stock_symbol === "MSFT")
          .map((item) => item.avg_high);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Apple - Open",
              data: appleDataOpen,
              borderColor: "rgba(255, 12, 132, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Apple - High",
              data: appleDataHigh,
              borderColor: "rgba(255, 50, 100, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Apple - Close",
              data: appleDataClose,
              borderColor: "rgba(255, 60, 80, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Microsoft - Open",
              data: microsoftDataOpen,
              borderColor: "rgba(150, 162, 235, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Microsoft - High",
              data: microsoftDataHigh,
              borderColor: "rgba(100, 162, 200, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Microsoft - Close",
              data: microsoftDataClose,
              borderColor: "rgba(54, 162, 180, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        });
      });
  }, []);

  return (
    <div className={style.daily_avg}>
      <h4>Daily Averages</h4>
      <h5>(Average Closing Prices on a Daily Basis)</h5>
      {chartData && (
        <Bar
          ref={chartRef as MutableRefObject<any>}
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { display: false },
              y: {
                ticks: {
                  callback: function (value) {
                    return "$" + value;
                  },
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    label += "$" + parseFloat(context.raw as string).toFixed(2);
                    return label;
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default DailyAverage;
