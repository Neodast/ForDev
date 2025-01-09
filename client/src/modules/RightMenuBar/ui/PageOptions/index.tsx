import { Card, Checkbox, Select } from 'antd';

type PageOptionsProps {
  filters: string[];
}

export function PageOptions({filters}: PageOptionsProps) {
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
      {filters.map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox id={filter} />
              <label
                htmlFor={filter}
                className="text-md font-semibold leading-none hover:cursor-pointer peer-disabled:opacity-70"
              >
                {filter}
              </label>
            </div>
          ))}
      </div>
    </Card>
  );
}
