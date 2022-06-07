const serialize = (value: string): string => {
    return Number(value).toString();
}

export const serializer = {
    serialize,
}