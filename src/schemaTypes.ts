export type Component = TextComponent | SelectComponent | RangePickerComponent | TextareaComponent;

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
};

export type SelectOption = {
  label: string;
  value: string;
};

export type RangePickerComponent = {
  name: [string, string];
  component: 'range_picker';
  label: [string, string];
};

export type TextareaComponent = {
  name: string;
  label: string;
  component: 'textarea';
};
