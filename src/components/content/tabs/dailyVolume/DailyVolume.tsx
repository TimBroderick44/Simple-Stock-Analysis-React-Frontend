import { useEffect, useState, useRef, MutableRefObject } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { StockData } from "../../../../types/stockData/StockData";
import style from "./DailyVolume.module.scss";
import "../../../../chartConfig";

function DailyVolume() {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    fetch("/api/daily_volume")
      .then((response) => response.json())
      .then((data: StockData[]) => {
        const labels = data.filter(item => item.stock_symbol === "AAPL").map(item => item.date);
        const appleData = data.filter(item => item.stock_symbol === "AAPL").map(item => item.total_volume);
        const microsoftData = data.filter(item => item.stock_symbol === "MSFT").map(item => item.total_volume);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Apple",
              data: appleData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Microsoft",
              data: microsoftData,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <div className={style.daily_volume}>
      <h4>Daily Volume</h4>
      <h5>(Total Amount Sold on a Daily Basis)</h5>
      {chartData && <Bar ref={chartRef as MutableRefObject<any>} data={chartData} options={{ maintainAspectRatio: false, scales: { x: { display: false } } }} />}
    </div>
  );
}

export default DailyVolume;
