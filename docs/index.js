function getTime() {
    // get the time from the hash of the page

    let stime = window.location.hash;

    // if the hash exists
    if (stime) {
        // the hash exists

        // cut off the leading '#'
        stime = stime.substring(1);

        // convert the time to a dayjs object
        return dayjs.unix(parseFloat(stime));
    } else {
        // the hash doesn't exist; make it the current time
        let time = dayjs();

        // actually set it
        setTime(time);

        // get the time again (in case it was changed during refreshTime for some reason)
        return getTime(); // time;
    }
}

function setTime(timeObj) {
    // convert any dayjs object to a number
    let time = Number.isFinite(timeObj) ? timeObj : timeObj.unix();

    window.location.hash = time.toString();

    refreshTime();
}

function refreshTime() {
    document.getElementById('bigTime').innerText = getTime().format('llll');
}

function doThisOnReady() {
    setInterval(refreshTime, 1000);
}