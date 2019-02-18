function pad(number, size) {
    let s = String(number)
    while (s.length < (size || 2)) { s = "0" + s }
    return s
}

export function TimestampToString(timestamp) {
    let date
    try { date = new Date(timestamp) }
    catch { return "" }
    return [
        [pad(date.getDay(), 2), pad(date.getMonth() + 1, 2), date.getFullYear()].join("/"),
        [pad(date.getHours(), 2), pad(date.getMinutes(), 2), pad(date.getSeconds(), 2)].join(":"),
    ].join(" ")
}