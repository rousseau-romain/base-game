
import {
  red500,
  purple500,
  pink500,
  deepPurple500,
  indigo500,
  blue500,
  teal500,
  deepOrange500,
  brown500,
  blueGrey500,
} from 'material-ui/styles/colors';

const colors = [
  red500,
  pink500,
  purple500,
  deepPurple500,
  indigo500,
  blue500,
  teal500,
  deepOrange500,
  brown500,
  blueGrey500,
];

const colorFromString = (string) => {
  let int = string.replace(/\D/g, '');
  if (int === '') int = `${string.replace(/[A-Z]/gm, '').length}${string.replace(/[a-z]/gm, '').length}`;
  return colors[Math.floor(int / 12)];
};

export default colorFromString;
