

export const formatMBytes = (mBytes: number, percentage=1, decimals = 1): number => {
    if (toNumber(mBytes) === 0) {
      return 0;
    }
    const k = 1024;
    return formatFloat(((toNumber(mBytes) * percentage) / k), decimals);
}

export const formatFloat = (float: number, decimals = 1): number => {
    const dm = decimals < 0 ? 0 : decimals;
    return parseFloat(float.toFixed(dm));
}

export function toNumber(n: any): number {
    const isNum = !isNaN(parseFloat(n)) && !isNaN(n - 0)
    return isNum ? n : 0;
}
