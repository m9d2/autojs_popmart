function scheduleTaskAt(timeString, task) {
    const now = new Date();
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const target = new Date();
    target.setHours(hours, minutes, seconds, 0);
    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }
    const delay = target - now;
    log(`任务将在 ${target.toLocaleString()} 执行，延迟 ${delay / 1000} 秒`);
    setTimeout(() => {
        task();
        scheduleTaskAt(timeString, task);
    }, delay);
}

module.exports  = {
    scheduleTaskAt: scheduleTaskAt
};



