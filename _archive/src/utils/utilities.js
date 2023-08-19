

export const formatMBytes = (mBytes, percentage=1, decimals = 1) => {
    mBytes = toNumber(mBytes);
    if (mBytes === 0) {
      return 0;
    }
    const k = 1024;
    return formatFloat(((mBytes* percentage) / k), decimals);
} 

export const formatFloat = (float, decimals = 1) => {
    const dm = decimals < 0 ? 0 : decimals;
    return parseFloat(float.toFixed(dm));
} 

export function toNumber( n ) { 
    const isNum = !isNaN(parseFloat(n)) && !isNaN(n - 0) 
    return isNum ? n : 0;
}