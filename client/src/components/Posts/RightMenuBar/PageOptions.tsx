import { Card, Checkbox, Select } from 'antd'

export default function PageOptions() {
  return (
    <Card className="flex-1 items-start">
        <h4 className="text-xl flex-1">Options</h4>
        <h4 className="font-semibold text-lg flex">Sort By</h4>
        <Select
          size="large"
          placement="bottomLeft"
          defaultValue={'hot'}
          variant="outlined"
          options={[
            { value: 'hot', label: <span>Hot</span> },
            { value: 'new', label: <span>New</span> },
            { value: 'popular', label: <span>Popular</span> },
          ]}
          className="w-32 h-10 flex text-start my-1"
        ></Select>

        <div className="flex-1 space-y-2">
          <h4 className="font-semibold text-lg flex">Filters</h4>
          <div className="flex items-center space-x-2">
            <Checkbox id="front" />
            <label
              htmlFor="front"
              className="text-md font-semibold leading-none hover:cursor-pointer peer-disabled:opacity-70"
            >
              Frontend
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="back" />
            <label
              htmlFor="back"
              className="text-md font-semibold leading-none hover:cursor-pointer peer-disabled:opacity-70"
            >
              Backend
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fullstack" />
            <label
              htmlFor="fullstack"
              className="text-md font-semibold leading-none hover:cursor-pointer peer-disabled:opacity-70"
            >
              Fullstack
            </label>
          </div>
        </div>
      </Card>
  )
}
