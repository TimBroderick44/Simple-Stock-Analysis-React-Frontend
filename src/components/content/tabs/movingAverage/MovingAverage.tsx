import { useEffect, useState, useRef, MutableRefObject } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { StockData } from "../../../../types/stockData/StockData";
import style from "./MovingAverage.module.scss";
import "../../../../chartConfig";

function MovingAverage() {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // State for loading status
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    fetch("http://3.106.125.85:5000/api/moving_avg_close")
      .then((response) => response.json())
      .then((data: StockData[]) => {
        const labels = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.timestamp);
        const appleData = data
          .filter((item) => item.stock_symbol === "AAPL")
          .map((item) => item.moving_avg_close);
        const microsoftData = data
          .filter((item) => item.stock_symbol === "MSFT")
          .map((item) => item.moving_avg_close);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Apple",
              data: appleData,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Microsoft",
              data: microsoftData,
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        });

        setLoading(false);
      });
  }, []);

  return (
    <div className={style.moving_avg}>
      <h4>Moving Average Close</h4>
      <h5>(Average Closing Price by minute)</h5>
      {loading ? (
        <div className={style.loading}>
          <div className={style.loading_text}>
            <p>
              Data is being loaded. Please wait! <br /> (Fun Fact: Over 18,000
              data points are being processed!)
            </p>
          </div>
        </div>
      ) : (
        chartData && (
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
                    }
                  }
                }
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
        )
      )}
    </div>
  );
}

export default MovingAverage;
