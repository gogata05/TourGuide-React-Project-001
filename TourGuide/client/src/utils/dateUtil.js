import moment from '../../node_modules/moment/dist/moment.js';

export const formatDate = (input) => {
    const date = moment(input).format('DD.MM.YYYY');
    return date;
}

export const editFormatDate = (input) => {
    const date = moment(input).format('YYYY-MM-DD');
    return date;
}

export const commentTime = (input) => {
    const time = moment(input).fromNow();
    return time;
}