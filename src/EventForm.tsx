import { ReactNode } from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { schema } from './schema';
import { Component, ComponentType } from './schemaTypes';
import { isRangePicker, isSelect } from './utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type FormComponent = {
  [key in ComponentType]: (options?: any) => ReactNode;
};

const formComponents: FormComponent = {
  text: () => <Input />,
  select: (options: DefaultOptionType[]) => <Select options={options}></Select>,
  range_picker: () => <RangePicker style={{ width: '100%' }} />,
  textarea: () => <TextArea rows={4} />,
};

function getLabel(item: Component) {
  return isRangePicker(item) ? item.rangeLabel : item.label;
}
function getName(item: Component) {
  return isRangePicker(item) ? item.rangeName : item.name;
}
function getComponent(item: Component) {
  let options = isSelect(item) ? item.options : undefined;
  return formComponents[item.component](options);
}

const rangePickerNames = schema.filter(isRangePicker).map((item) => item.rangeName);

export default function EventForm() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      labelWrap
      onFinish={(event: any) => {
        const dateFormat = 'YYYY-MM-DD';

        rangePickerNames.forEach((field) => {
          const dateValues = event[field];
          event[field] = [dateValues[0].format(dateFormat), dateValues[1].format(dateFormat)];
        });

        console.log('event', event);
      }}
    >
      {schema.map((item, index) => (
        <Form.Item
          key={`${item.component}-${index}`}
          name={getName(item)}
          label={getLabel(item)}
          required={item.required}
          hasFeedback
          rules={[{ required: item.required, message: 'Required' }]}
        >
          {getComponent(item)}
        </Form.Item>
      ))}
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
