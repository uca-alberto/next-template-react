import { useEffect } from "react";
import * as echarts from "echarts";
import { LayautBgChart } from "./bg.chart.component";
import { ErrorMessages } from "../../enum/error-messages.enum";

interface IProps {
  array: any[];
  title: string;
  nameField: string;
  valueField: string;
}

export default function PieChart({ array, valueField, nameField, title }: IProps) {
  useEffect(() => {
    try {
      if (!array || array?.length === 0) {
        document.getElementById("pie-chart")!.innerHTML = ErrorMessages.NoDataToShow;
        return;
      }

      const values: { value: any; name: any }[] = [];
      array?.forEach((item: { [x: string]: any }) => {
        if (item[valueField] && item[nameField]) {
          const name =
            item[nameField]?.length >= 20
              ? item[nameField].split(0, 20)[0]
              : item[nameField];
          values.push({
            value: parseFloat(item[valueField]),
            name: name,
          });
        }
      });

      if (!values || !values.length) {
        document.getElementById("pie-chart")!.innerHTML = ErrorMessages.NoDataToShow;
        return;
      }
      const option: echarts.EChartsOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: 10,
          top: 60,
          bottom: 20,
          itemHeight: 20,
          textStyle: {
            fontWeight: "bold",
            fontSize: 13,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "90%"],
            avoidLabelOverlap: true,
            padAngle: 5,
            left: 380,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: values,
          },
        ],
      };

      const chart = echarts.init(document.getElementById("pie-chart"));
      chart.setOption(option);
      return () => chart.dispose();
    } catch (error) {
      console.error("Error in PieChart: ", error);
    }
  }, [array]);

  return (
    <LayautBgChart title={title}>
      <div
        id="pie-chart"
        className="w-full min-h-[36vh] flex justify-center items-center font-medium text-lg "
      ></div>
    </LayautBgChart>
  );
}
