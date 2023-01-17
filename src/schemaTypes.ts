export type Component = TextComponent | SelectComponent | RangePickerComponent | TextareaComponent;

export type ComponentType = 'text' | 'select' | 'range_picker' | 'textarea';

export type SelectOption = {
  label: string;
  value: string;
};

export type TextComponent = {
  name: string;
  label: string;
  component: 'text';
  required: boolean;
};

export type SelectComponent = {
  name: string;
  label: string;
  component: 'select';
  options: SelectOption[];
  required: boolean;
};

export type RangePickerComponent = {
  name: [string, string];
  component: 'range_picker';
  label: [string, string];
  required: boolean;
};

export type TextareaComponent = {
  name: string;
  label: string;
  component: 'textarea';
  required: boolean;
};
