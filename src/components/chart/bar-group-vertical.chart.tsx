import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface IProps {
     array: any[];
     field: string;
     title: string;
}
export default function ChartBarGroupVertical({ array, field, title }: IProps) {
     const chartRef = useRef<HTMLDivElement>(null);
     useEffect(() => {
          if (!array) {
               return;
          }
          const groupedDataByDate: { [key: string]: number } = {};
          const groupedDataByLabel: { [key: string]: { [key: string]: number } } = {};
          array.forEach(item => {
               const dateKey = new Date(item.createdAt).toLocaleDateString();
               const labelKey = item[field];
               groupedDataByDate[dateKey] = (groupedDataByDate[dateKey] || 0) + parseInt(item.recommendation_count);
               if (!groupedDataByLabel[labelKey]) {
                    groupedDataByLabel[labelKey] = {};
               }
               groupedDataByLabel[labelKey][dateKey] = (groupedDataByLabel[labelKey][dateKey] || 0) + parseInt(item.recommendation_count);
          });

          const chartLabel = Object.keys(groupedDataByDate);
          const chartData = Object.keys(groupedDataByLabel).map(label => ({
               name: label,
               type: 'bar',
               stack: 'total',
               emphasis: {
                    focus: 'series'
               },
               data: Object.keys(groupedDataByDate).map(date => groupedDataByLabel[label][date] || 0)
          }));


          if (chartRef.current && chartData.length > 0) {
               const myChart = echarts.init(chartRef.current);
               const option: echarts.EChartsOption = {
                    legend: {
                         left: "left",
                         orient: "vertical",
                         type: "scroll",
                         padding: [0, 0, 20, 40],
                         formatter: function (name) {
                              return echarts.format.truncateText(name, 290, '12px Microsoft Yahei', '..');
                         }
                    },
                    tooltip: {
                         trigger: 'item',
                         formatter: "{a}: {c}",
                         axisPointer: {
                              type: 'shadow'
                         }
                    },
                    xAxis: {
                         type: 'category',
                         data: chartLabel
                    },
                    grid: {
                         left: "25%",
                         right: "5%",
                         bottom: "10%",
                         containLabel: true,
                    },
                    yAxis: {
                         type: 'value'
                    },
                    series: chartData as echarts.BarSeriesOption[]
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
                         className='w-full min-h-[36vh]'
                    />
               </div>
          </>
     );
};
