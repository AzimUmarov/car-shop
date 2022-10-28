import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";

const scrypt = promisify(_scrypt);

export async function encrypt(password: string, salt?: string): Promise<string> {
    if(!salt)
        salt = randomBytes(8).toString("hex");

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + "." + hash.toString("hex");
}

export async function checkCrypt(hash: string, password: string): Promise<boolean> {
    const [salt, storedHash] = hash.split('.');

    return await encrypt(password, salt) === storedHash;
}