import PageActions from './PageActions';
import PageInfo from './PageInfo';
import PageOptions from './PageOptions';

interface RightMenuBarProps {
  filters: string[];
  actionTitle: string;
  form: JSX.Element;
}

export default function RightMenuBar(props: RightMenuBarProps) {
  return (
    <div className="fixed right-0 top-0 h-96 w-[19rem] p-4 pt-20 ">
      <PageActions actionTitle={props.actionTitle} form={props.form}></PageActions>
      <PageInfo
        title="dwd"
        text="dwd"
        stats={[
          { statMetric: 45, statName: 'wd' },
          { statMetric: 5, statName: 'wff' },
          { statMetric: 7, statName: 'dwd' },
        ]}
      ></PageInfo>
      <PageOptions filters={props.filters}></PageOptions>
    </div>
  );
}
