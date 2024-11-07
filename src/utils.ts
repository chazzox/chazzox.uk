export function xor(a: boolean, b: boolean): boolean {
    return (a || b) && !(a && b);
}

const LOG_STYLES = {
    color: "green",
    background: "#2c2c2c",
    padding: "2px 0.5em",
    "border-radius": "0.5em",
    "font-weight": "bold"
};

/**
 * `console.log` with the extension prefix that has nice styles
 * @param style the styles you want the log to
 * @param output data to log
 */
export function log(prefix: string, ...output: any): void {
    if (process.env) {
        console.log("\x1b[2;37;41m" + prefix + "\x1b[0m", ...output);
        return;
    }
    console.log(
        `%c${prefix}`,
        Object.entries(LOG_STYLES)
            .map(([a, b]) => `${a}:${b};`)
            .join(""),
        ...output
    );
}
