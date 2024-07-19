import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface IField {
     name: string;
     value: string;
}

interface IProps {
     array: any[];
     fields: IField;
     title: string;
}

export default function StackedLineChart({ array, fields, title }: IProps) {
     const chartRef = useRef<HTMLDivElement>(null);
     let myChart: echarts.ECharts | null = null;

     useEffect(() => {
          if (chartRef.current) {
               myChart = echarts.init(chartRef.current);
               const values: { value: any; name: any }[] = [];
               array?.forEach((item: { [x: string]: any }) => {
                    if (item[fields.value] && item[fields.name]) {
                         const name =
                              item[fields.name].length >= 20
                                   ? item[fields.name].split(0, 20)[0]
                                   : item[fields.name];
                         values.push({
                              value: item[fields.value],
                              name: name,
                         });
                    }
               });

               const option: echarts.EChartsOption = {
                    tooltip: {
                         trigger: 'axis'
                    },
                    legend: {
                         data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                    },
                    grid: {
                         left: '3%',
                         right: '4%',
                         bottom: '3%',
                         containLabel: true
                    },
                    xAxis: {
                         type: 'category',
                         boundaryGap: false,
                         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                         type: 'value'
                    },
                    series: [
                         {
                              name: 'Email',
                              type: 'line',
                              stack: 'Total',
                              data: [120, 132, 101, 134, 90, 230, 210]
                         },
                         {
                              name: 'Union Ads',
                              type: 'line',
                              stack: 'Total',
                              data: [220, 182, 191, 234, 290, 330, 310]
                         },
                         {
                              name: 'Video Ads',
                              type: 'line',
                              stack: 'Total',
                              data: [150, 232, 201, 154, 190, 330, 410]
                         },
                         {
                              name: 'Direct',
                              type: 'line',
                              stack: 'Total',
                              data: [320, 332, 301, 334, 390, 330, 320]
                         },
                         {
                              name: 'Search Engine',
                              type: 'line',
                              stack: 'Total',
                              data: [820, 932, 901, 934, 1290, 1330, 1320]
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
          <div className="p-2 max-h-[40vh]">
               <div className='h-8 '>
                    <span>{title}</span>
               </div>
               <div
                    ref={chartRef}
                    className="w-full min-h-[38vh]  rounded-md shadow-md"
               />
          </div>
     );
};

