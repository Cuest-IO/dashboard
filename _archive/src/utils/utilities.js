

export const formatMBytes = (mBytes, percentage=1, decimals = 1) => {
    if (mBytes === 0) {
      return 0;
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;


    return (parseFloat(((mBytes* percentage) / k).toFixed(dm)));
  } 