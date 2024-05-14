import PostStat from '@/types/board/posts/PostsStat';
import { Card } from 'antd';

interface PageInfoProps {
  title: string;
  text: string;
  stats: PostStat[];
}

export default function PageInfo(props: PageInfoProps) {
  return (
    <Card className="my-4" type="inner">
      <h4 className="text-xl font-semibold mb-4">{props.title}</h4>
      <span className="text-wrap text-start font-md font-nimbus ">
        {props.text}
      </span>
      <div className="flex mt-4 text-nowrap justify-between">
        {props.stats.map((stat) => (
          <span className="text-sm font-semibold flex space-x-1">
            <div>{stat.statMetric}</div>
            <div>{stat.statName}</div>
          </span>
        ))}
      </div>
    </Card>
  );
}
