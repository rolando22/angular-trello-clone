export type colorButton = 'primary' | 'success' | 'danger' | 'sky' | 'gray-light' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
export type mapColorsButton = Record<colorButton, string>;

export type color = 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
export type mapColorsCard = Record<color, string>;

export type mapColorsBackground = Record<color, string>;

export const colorsButton: mapColorsButton = {
  primary: 'text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300',
  success: 'text-white bg-success-700 hover:bg-success-800 focus:ring-success-300',
  danger: 'text-white bg-danger-700 hover:bg-danger-800 focus:ring-danger-300',
  sky: 'text-white bg-sky-700 hover:bg-sky-800 focus:ring-sky-300',
  'gray-light': 'text-gray-700 bg-gray-200 hover:bg-gray-500 hover:text-white focus:ring-gray-50',
  yellow: 'text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300',
  green: 'text-white bg-green-700 hover:bg-green-800 focus:ring-green-300',
  red: 'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300',
  violet: 'text-white bg-violet-700 hover:bg-violet-800 focus:ring-violet-300',
  gray: 'text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300',
};

export const colorsCard: mapColorsCard = {
  sky: 'bg-sky-700 hover:bg-sky-800 text-white',
  yellow: 'bg-yellow-700 hover:bg-yellow-800 text-white',
  green: 'bg-green-700 hover:bg-green-800 text-white',
  red: 'bg-red-700 hover:bg-red-800 text-white',
  violet: 'bg-violet-700 hover:bg-violet-800 text-white',
  gray: 'bg-gray-700 hover:bg-gray-800 text-white',
};

export const colorsBackground: mapColorsBackground = {
  sky: 'bg-sky-600',
  yellow: 'bg-yellow-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  violet: 'bg-violet-400',
  gray: 'bg-gray-600',
};

export const navColorsBackground: mapColorsBackground = {
  sky: 'bg-sky-700',
  yellow: 'bg-yellow-700',
  green: 'bg-green-700',
  red: 'bg-red-700',
  violet: 'bg-violet-700',
  gray: 'bg-gray-700',
};
