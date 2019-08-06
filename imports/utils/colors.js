const customColors = {
  primary: {
    superLight: 'rgba(206, 231, 255, 1)',
    light: 'rgba(163, 210, 255, 1)',
    base: 'rgba(0, 131, 255, 1)',
    dark: 'rgba(0, 104, 203, 1)',
  },
  secondary: {
    light: 'rgba(241, 241, 241, 1)',
    base: 'rgba(218, 218, 218, 1)',
    dark: 'rgba(189, 189, 189, 1)',
  },
  third: 'rgba(252, 186, 33, 1)',
  alert: {
    wrong: 'rgba(253, 31, 31, 1)',
    valid: 'rgba(46, 239, 39, 1)',
  },
  orange: 'rgba(255, 135, 0, 1)',
  red: 'rgb(255,0,0)',
  blue: 'rgb(0,0,255)',
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
