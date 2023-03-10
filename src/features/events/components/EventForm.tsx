import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Form, Input, Button, Select, DatePicker, Row, Col, Alert, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { Component, ComponentType, Event } from '../types';
import { isRangePicker, isSelect, QueryKeys } from '../utils';
import { getSchema } from '../services';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

type FormComponent = {
  [key in ComponentType]: (options?: any) => ReactNode;
};

const formComponents: FormComponent = {
  text: () => <Input />,
  select: ({ options, testId }: { options: DefaultOptionType[]; testId: string }) => (
    <Select data-testid={testId} options={options}></Select>
  ),
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
  const options = isSelect(item) ? item.options : undefined;

  return formComponents[item.component]({ options, testId: item.name });
}

function updateRangePickerProperties(event: any, schema?: Component[]) {
  if (!schema || !event) return;

  const dateFormat = 'YYYY-MM-DD';
  const components = schema.filter(isRangePicker);

  components.forEach((component) => {
    const rangeValues: any[] = event[component.rangeName];
    const formattedDates: string[] = rangeValues.map((value: any) => value.format(dateFormat));

    component.name.forEach((name, index) => {
      event[name] = formattedDates[index];
    });

    delete event[component.rangeName];
  });
}

type EventFormProps = {
  onSave: (event: Event) => void;
};

export default function EventForm({ onSave }: EventFormProps) {
  const {
    data: schema,
    error: schemaError,
    isError: isSchemaError,
    isLoading: isSchemaLoading,
  } = useQuery<Component[], AxiosError>(QueryKeys.schema, getSchema);

  const [form] = Form.useForm();

  if (isSchemaError) {
    return <Alert message="Error" description={schemaError?.message} type="error" />;
  }
  if (isSchemaLoading) {
    return <Spin tip="Loading..." />;
  }

  const handleEventCreation = (event: Event) => {
    updateRangePickerProperties(event, schema);
    onSave(event);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
      labelWrap
      onFinish={handleEventCreation}
    >
      {schema?.map((item: Component, index: number) => (
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
