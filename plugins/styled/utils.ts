import * as crypto from "crypto";

export function createHash(string: string) {
    return crypto
        .createHash("md5")
        .update(string)
        .digest("hex")
        .substring(0, 8);
}
