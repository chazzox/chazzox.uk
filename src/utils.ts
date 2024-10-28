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
export function log(style = LOG_STYLES, prefix: string, ...output: any): void {
    console.log(
        `%c${prefix}`,
        Object.entries(style)
            .map(([a, b]) => `${a}:${b};`)
            .join(""),
        ...output
    );
}

export function warn(style = LOG_STYLES, prefix: string, ...output: any): void {
    console.warn(
        `%c${prefix}`,
        Object.entries(style)
            .map(([a, b]) => `${a}:${b};`)
            .join(""),
        ...output
    );
}
