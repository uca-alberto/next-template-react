import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
interface LineChartProps {
  array: any[];
  title: string;
}

const LineChartByDate: React.FC<LineChartProps> = ({
  array,
  title
}) => {
  //const { initialDate, finalDate } = useAuth();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && array.length > 0) {
      const myChart = echarts.init(chartRef.current);

      const filteredData = array.filter((item) => item.seller !== null);

      filteredData.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      const dateSet = new Set<string>();
      filteredData.forEach((item) => dateSet.add(item.createdAt.split("T")[0]));

      const dates = Array.from(dateSet);

      const seriesData: { [seller: string]: number[] } = {};
      filteredData.forEach((item) => {
        const date = item.createdAt.split("T")[0];
        if (!seriesData[item.seller]) {
          seriesData[item.seller] = Array(dates.length).fill(0);
        }
        const index = dates.indexOf(date);
        seriesData[item.seller][index] += parseInt(item.lead_count);
      });
      const series = Object.keys(seriesData).map((seller) => {
        return {
          name: seller,
          type: "line",
          data: seriesData[seller],
        };
      });
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: Object.keys(seriesData),
          type: "scroll",
          orient: "vertical",
          left: 10,
          top: 60,
          bottom: 20,
          textStyle: {
            fontWeight: "bold",
            fontSize: 12,
          },
        },
        grid: {
          left: "25%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        /* toolbox: {
           feature: {
             saveAsImage: {},
           },
         },*/
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [array]);

  return (
    <>
      <div className='p-3 border border-slate-50 rounded-md shadow-md'>
        <div className='h-8 '>
          <span>{title}</span>
        </div>
        <div
          ref={chartRef}
          className='w-full min-h-[36vh] '
        />
      </div>
    </>
  );
};

export default LineChartByDate;
