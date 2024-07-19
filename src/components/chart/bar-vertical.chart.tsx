import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface IField {
     name: string;
     value: string;
}
interface IProps {
     array: any[];
     fields: IField;
     title: string;
}

export default function ChartBarVertical({ array, fields, title }: IProps) {
     const chartRef = useRef<HTMLDivElement>(null);
     let myChart: echarts.ECharts | null = null;

     useEffect(() => {
          if (chartRef.current) {
               const values: number[] = [];
               const names: string[] = [];
               array?.forEach((item: { [x: string]: any }) => {
                    if (item[fields.value] && item[fields.name]) {
                         const name =
                              item[fields.name].length >= 15
                                   ? item[fields.name].split(0, 15)[0]
                                   : item[fields.name];
                         values.push(item[fields.value]);
                         names.push(name);
                    }
               });

               myChart = echarts.init(chartRef.current);

               const option: EChartsOption = {
                    legend: {
                         left: "left",
                         orient: "vertical",
                    },
                    xAxis: {
                         type: 'category',
                         data: names
                    },
                    tooltip: {
                         trigger: "axis",
                         formatter: "{b}: {c}",
                    },
                    yAxis: {
                         type: 'value'
                    },
                    series: [
                         {
                              type: 'bar',
                              label: {
                                   show: true,
                                   position: 'inside'
                              },
                              encode: { x: 'name', y: 'score' },
                              data: values,
                         }
                    ]
               };

               myChart.setOption(option);

               return () => {
                    if (myChart) {
                         myChart.dispose();
                         myChart = null;
                    }
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
}
