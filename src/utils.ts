export function xor(a: boolean, b: boolean): boolean {
    return (a || b) && !(a && b);
}

function createRandomPrefix() {
    return "";
}

class Logger {
    #prefix: string;
    constructor(prefix: string) {
        this.#prefix = prefix;
    }
    info(...obj: any[]) {
        console.log(this.#prefix, ...obj);
    }
}

export class LoggerFactory {
    #instance: Logger | undefined;
    createInstance(prefix?: string) {
        return new Logger(prefix || createRandomPrefix());
    }
    getInstance() {
        if (!this.#instance) {
            this.#instance = this.createInstance();
        }
        return this.#instance;
    }
}
