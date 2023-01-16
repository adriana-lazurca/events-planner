import { Button, Input, Table, Space, Tag } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { schema } from './schema';
import { data } from './data';
import { Event } from './dataTypes';
import { Component, RangePickerComponent } from './schemaTypes';

const { Search } = Input;

const dataSource = data.map((item) => ({
  ...item,
  key: item.id,
}));

function MapComponent(component: Component): ColumnType<Event> {
  return { title: component.label, dataIndex: component.name };
}

function MapRangePickerComponent(component: RangePickerComponent): ColumnsType<Event> {
  return component.name.map((name, index) => ({
    title: component.label[index],
    dataIndex: name,
  }));
}

const columns: ColumnsType<Event> = schema.flatMap((item) => {
  if (item.component === 'range_picker') {
    return MapRangePickerComponent(item);
  }
  return MapComponent(item);
});

export default function EventsDashboard() {
  const onSearch = (value: string) => console.log(value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5em', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '2em' }}>
        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
        <Button>Create event</Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
