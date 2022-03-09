/* 补全数字 */
export const padLeft = (n) => {
    return n < 10 ? '0' + n : n
}

/* 生成数组 */
export const createArr = (length, startAt = 0) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i + startAt);
    }
    return arr;
}

/* 创建 */
export const parseToYearAndMonth = (str) => {
    const date = str ? new Date(str) : new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
    }
}

/* 判断日期正误 */
export const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

/* 数组扁平化 */
export const flatternArr = (arr) => {
    // prev curr
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map
    }, {})
}