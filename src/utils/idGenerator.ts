export type UniqID = string & { readonly brand: unique symbol };

export const generateID = (): UniqID=>{
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);

    return `${timestamp}_${random}` as UniqID;
}

export const generateProjectId = (): number => {
    return Math.floor(Math.random() * 1000000);
}