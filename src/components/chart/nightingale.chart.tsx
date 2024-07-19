import { useEffect } from "react";
import * as echarts from "echarts"; // Import ECharts library
import { LayautBgChart } from "./bg.chart.component";
import { ErrorMessages } from "../../enum/error-messages.enum";

interface IProps {
  array: { [key: string]: string }[];
  valueField: string;
  nameField: string;
  title: string;
  addSymbol?: string;
}

export default function NightingaleChart({
  array,
  valueField,
  nameField,
  title,
  addSymbol = "",
}: IProps) {
  useEffect(() => {
    try {
      if (!array || !array?.length) {
        document.getElementById("nightingale-chart")!.innerHTML =
          ErrorMessages.NoDataToShow;
      }

      const seriesData = array?.map((item) => ({
        value: item[valueField],
        name: item[nameField],
      }));

      if (!seriesData || !seriesData?.length) {
        document.getElementById("nightingale-chart")!.innerHTML =
          ErrorMessages.NoDataToShow;
        return;
      }

      const option = {
        legend: {
          left: "left",
          orient: "vertical",
          textStyle: {
            fontWeight: "bold",
            fontSize: 13,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: `{b}: <br/>${addSymbol} {c} ({d}%)`,
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 150],
            center: ["60%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: seriesData,
          },
        ],
      };

      const chart = echarts.init(document.getElementById("nightingale-chart"));
      chart.setOption(option);
      return () => chart.dispose();
    } catch (error) {
      console.error("Error in NightingaleChart: ", error);
    }
  }, [array]);

  return (
    <LayautBgChart title={title}>
      <div
        id="nightingale-chart"
        className="w-full min-h-[36vh] flex justify-center items-center font-medium text-lg "
      ></div>
    </LayautBgChart>
  );
}
