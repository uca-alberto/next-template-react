// EChartComponent.js
import { useEffect } from "react";
import * as echarts from "echarts"; // Import ECharts library
import { LayautBgChart } from "./bg.chart.component";
import { ErrorMessages } from "../../enum/error-messages.enum";

interface IProps {
  array: { [key: string]: string }[];
  title: string;
  valueField: string;
  nameXField: string;
  nameYField: string;
  titleYField?: string;
  titleXField?: string;
}

export default function StackedBarChart({
  array,
  title,
  valueField,
  nameXField,
  nameYField,
  titleYField,
  titleXField,
}: IProps) {
  useEffect(() => {
    try {
      if (!array || array?.length === 0) {
        document.getElementById("stacked-bar-chart")!.innerHTML =
          ErrorMessages.NoDataToShow;
        return;
      }

      const groupedData: { [date: string]: { [sellerName: string]: number } } = {};
      const flagFieldByY = nameYField === "createdAt";

      array?.forEach((item) => {
        const date = flagFieldByY
          ? new Date(item.createdAt).toISOString().split("T")[0]
          : item[nameYField];
        if (!groupedData[date]) {
          groupedData[date] = {};
        }
        if (!groupedData[date][item[nameXField]]) {
          groupedData[date][item[nameXField]] = 0;
        }
        groupedData[date][item[nameXField]] += +item[valueField];
      });

      const dates = Object.keys(groupedData);

      if (!dates || !dates.length) {
        document.getElementById("stacked-bar-chart")!.innerHTML =
          ErrorMessages.NoDataToShow;
        return;
      }

      const uniqueLegends = Array.from(new Set(array?.map((item) => item[nameXField])));
      const reasonCounts = uniqueLegends.map((legend) =>
        dates.map((date) => groupedData[date][legend] || 0)
      );

      const option = {
        legend: {
          data: uniqueLegends,
          left: "left",
          orient: "vertical",
          type: "scroll",
          pageButtonPosition: "end",
          pageIcons: {
            horizontal: ["arrow-left", "arrow-right"],
          },
          pageIconSize: 10,
          pageTextStyle: {
            color: "#333",
          },
          padding: [0, 0, 20, 40],
          textStyle: {
            fontWeight: "bold",
            fontSize: 13,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}: {c}",
        },
        grid: {
          left: "20%",
          right: "5%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          name: titleXField ?? "",
          data: dates.map((date) => {
            if (!flagFieldByY) return date;
            const d = new Date(date);
            const day = d.getDate();
            const month = d.toLocaleString("default", { month: "short" });
            const year = d.getFullYear();
            return `${day} ${month} ${year}`;
          }),
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false },
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
          scrollable: true,
          boundaryGap: true,
        },
        yAxis: {
          type: "value",
          name: titleYField ?? "Cantidad",
        },
        series: uniqueLegends.map((legend, index) => ({
          name: legend,
          type: "bar",
          stack: "grouped",
          data: reasonCounts[index],
        })),
      };

      const chart = echarts.init(document.getElementById("stacked-bar-chart"));
      chart.setOption(option);
      return () => chart.dispose();
    } catch (error) {
      console.error("Error in StackedBarChart: ", error);
    }
  }, [array]);

  return (
    <LayautBgChart title={title}>
      <div
        id="stacked-bar-chart"
        className="w-full min-h-[36vh] flex justify-center items-center font-medium text-lg "
      ></div>
    </LayautBgChart>
  );
}
