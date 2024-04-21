import PageActions from './PageActions';
import PageInfo from './PageInfo';
import PageOptions from './PageOptions';

export default function RightMenuBar() {
  return (
    <div className="fixed right-0 top-0 h-96 w-[19rem] p-4 pt-20 ">
      <PageActions></PageActions>
      <PageInfo></PageInfo>
      <PageOptions></PageOptions>
    </div>
  );
}
