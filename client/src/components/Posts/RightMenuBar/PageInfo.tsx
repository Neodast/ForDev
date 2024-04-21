import { Card } from 'antd'

export default function PageInfo() {
  return (
    <Card className="my-4" type="inner">
        <h4 className="text-xl font-semibold mb-4">All posts from /ForDev</h4>
        <span className="text-wrap text-start font-md font-nimbus ">
          <p>In this page placed all posts from forum.</p>
        </span>
        <div className="flex-1 flex-col text-nowrap space-x-4">
          <span className="text-sm font-semibold">145 posts</span>
          <span className="text-sm font-semibold">18 sections</span>
          <span className="text-sm font-semibold">67 authors</span>
        </div>
      </Card>
  )
}
