import * as bcrypt from 'bcrypt';

export const hashPW = async (password: string) => {
    const salt = await bcrypt.genSaltSync();

    return await bcrypt.hashSync(password, salt);
}

export const verifyPW = async (password: string, hash: string) => {
    return await bcrypt.compareSync(password, hash);
}