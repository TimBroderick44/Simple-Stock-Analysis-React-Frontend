import { useEffect, useState, useRef, MutableRefObject } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { StockData } from "../../../../types/stockData/StockData";
import style from "./HourlyMax.module.scss";
import "../../../../chartConfig";

function HourlyMax() {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    fetch("http://3.106.125.85:5000/api/hourly_max")
      .then((response) => response.json())
      .then((data: StockData[]) => {
        const labels = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.hour);
        const appleData = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.max_high);
        const microsoftData = data
          .filter((item) => item.stock_symbol === "MSFT")
          .map((item) => item.max_high);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Apple",
              data: appleData,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Microsoft",
              data: microsoftData,
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <div className={style.hourly_max}>
      <h4>Hourly Max Prices</h4>
      <h5>(Maximum Prices on an Hourly Basis)</h5>
      {chartData && (
        <Line
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
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += '$' + parseFloat(context.raw as string).toFixed(2);
                    return label;
                  }
                }
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default HourlyMax;
