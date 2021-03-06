import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const customColors = {
  primary: {
    superLight: indigo[300],
    light: indigo[400],
    base: indigo[500],
    dark: indigo[600],
  },
  secondary: {
    light: 'rgba(241, 241, 241, 1)',
    base: 'rgba(218, 218, 218, 1)',
    dark: 'rgba(189, 189, 189, 1)',
  },
  third: 'rgba(252, 186, 33, 1)',
  alert: {
    wrong: red[500],
    valid: green[500],
  },
  orange: 'rgba(255, 135, 0, 1)',
  red: 'rgb(255,0,0)',
  blue: 'rgb(0,0,255)',
  white: 'rgb(255,255,255)',
};

const colors = (selectors) => {
  const selector = selectors.split('.');
  const color = selector.reduce((accuColor, value) => {
    if (typeof accuColor === 'object') {
      // return next obj tu reduce
      return accuColor[value];
    }
    return accuColor;
  }, customColors);

  return color || 'pink';
};

export default colors;
