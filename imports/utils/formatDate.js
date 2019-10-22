import moment from 'moment';

const formatDate = string => moment(string).format('LLL');

export default formatDate;
