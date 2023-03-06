

export const formatMBytes = (mBytes, decimals = 1) => {
    if (mBytes === 0) {
      return 0;
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;


    return parseFloat((mBytes / k).toFixed(dm));
  } 