export const getTodayDate = () => {
    const dateNow = new Date(Date.now());
    dateNow.setMilliseconds(0);
    dateNow.setMinutes(0);
    dateNow.setSeconds(0);
    dateNow.setHours(0);
    return dateNow.getTime();
};

export const getEndDate = (dateNow, nbDays = 7) => {
    return new Date(dateNow + 24 * 3600 * 1000 * nbDays).getTime();
};

export const formatTime = (t, forceHour = false) => {
    var negativeTime = t < 0;
    if (negativeTime) {
        t = -1 * t;
    }
    var tH = Math.floor(t / 3600);
    var tempHour = ('0' + tH).slice(-2);
    var tempMinute = ('0' + (Math.floor(t / 60) % 60)).slice(-2);
    var tempSecond = ('0' + (Math.floor(t) % 60)).slice(-2);

    if (tH >= 1 || true === forceHour) {
        var retValue = tempHour + ':' + tempMinute + ':' + tempSecond;
    } else {
        var retValue = tempMinute + ':' + tempSecond;
    }
    if (negativeTime) {
        retValue = '- ' + retValue;
    }
    return retValue;
};

export const getTextFromDate = (date) => {
    if (typeof date === 'number') {
        date = new Date(date);
    }

    var tempHour = ('0' + date.getHours()).slice(-2);
    var tempMinute = ('0' + date.getMinutes()).slice(-2);
    var tempSecond = ('0' + date.getSeconds()).slice(-2);
    return tempHour + ':' + tempMinute + ':' + tempSecond;
};

export const computeCurrentProgress = (startDate, endDate) => {
    return Math.trunc(((Date.now() - startDate) / (endDate - startDate)) * 100);
};

export const textFormat = (startDate, index) => {
    if (index === 0) {
        const next = Math.trunc(
            Math.trunc((startDate - Date.now()) / 1000) / 60,
        );
        return next > 60
            ? `In ${Math.trunc(next / 60)}h${
                  next % 60 === 0 ? '00' : next % 60
              }`
            : `In ${next}min`;
    }
    const h = new Date(startDate).getHours();
    const min = new Date(startDate).getMinutes();
    const hours = h < 10 ? '0' + h : h;
    const minutes = min < 10 ? '0' + min : min;
    return `At ${hours}h${minutes}`;
};

export const getDuration = (startDate, endDate) => {
    const duration = Math.trunc(Math.trunc((endDate - startDate) / 1000) / 60);
    const min = duration % 60 === 0 ? '00' : duration % 60;
    const hours = Math.trunc(duration / 60);
    return hours > 0 ? `${hours}h${min}` : `${min}min`;
};
