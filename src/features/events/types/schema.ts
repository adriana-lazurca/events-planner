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
  required?: boolean;
};

export type SelectComponent = {
  name: string;
  label: string;
  component: 'select';
  required?: boolean;
  options: SelectOption[];
};

export type RangePickerComponent = {
  name: [string, string];
  label: [string, string];
  rangeLabel: string;
  rangeName: string;
  component: 'range_picker';
  required?: boolean;
};

export type TextareaComponent = {
  name: string;
  label: string;
  component: 'textarea';
  required?: boolean;
};
