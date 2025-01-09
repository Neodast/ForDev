import PostStat from '@/@depr/types/board/posts/PostsStat';
import { Card } from 'antd';

interface PageInfoProps {
  title: string;
  text: string;
}

export function PageInfo({ text, title }: PageInfoProps) {
  return (
    <Card className="my-4" type="inner">
      <h4 className="text-xl font-semibold mb-4">{title}</h4>
      <span className="text-wrap text-start font-md font-nimbus ">{text}</span>
      <div className="flex mt-4 text-nowrap justify-center">
        {/* {stats.map((stat) => (
          <span key={stat.statName} className="text-sm font-semibold flex space-x-1">
            <div>{stat.statName}</div>
            <div>{stat.statMetric}</div>
          </span>
        ))} */}
        {/* <span
          className="text-sm font-semibold flex space-x-1"
        >
          <div>{stats.statName}</div>
          <div>{stats.statMetric}</div>
        </span> */}
      </div>
    </Card>
  );
}
