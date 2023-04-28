export const EpochToDate = (Epoch: number) => {
    const theDate = new Date(Epoch * 1000);
    const [date, time] = theDate.toLocaleString('en-GB',{
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        hour12: true
    }).split(',');
    return {date, time};
};

export const getCurrentEpoch = () => {
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    return secondsSinceEpoch;
};

export const getCustomDate = (date: string) => {
    const someDate  = new Date(date);
    return someDate.getTime();
};

