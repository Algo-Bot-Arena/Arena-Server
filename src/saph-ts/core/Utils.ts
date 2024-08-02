export function generateUUID(): string {
    let date = new Date().getTime();
    let date2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0;
        if (date > 0) {
            r = (date + r) % 16 | 0;
            date = Math.floor(date / 16);
        } else {
            r = (date2 + r) % 16 | 0;
            date2 = Math.floor(date2 / 16);
        }
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function generateCC(): string {
    let date = new Date().getTime();
    let date2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;

    return "xxxxxxxx".replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0;
        if (date > 0) {
            r = (date + r) % 16 | 0;
            date = Math.floor(date / 16);
        } else {
            r = (date2 + r) % 16 | 0;
            date2 = Math.floor(date2 / 16);
        }
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
