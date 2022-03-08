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