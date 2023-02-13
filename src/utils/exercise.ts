// Create a generic that will take the first element of the array and return the type of that one
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type First<T extends any[]> = T[0];

type Length<T extends any[]> = T extends { length: infer L } ? L : never;
type Prev<T extends number> = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
][T];
type Last<T extends any[]> = T[Prev<Length<T>>];

type head1 = First<arr1>;
type head2 = First<arr2>;
type tail = Last<arr1>;

type User = { name: string } & Partial<{
  age: number;
  city: string;
}>;
const user: User = { name: 'ana' };

//////////
const obj = {
  name: 'Emil',
  age: 21,
};

function getValue<T extends {}>(ob: T, name: keyof T) {
  return ob[name];
}
const value = getValue(obj, 'age');
