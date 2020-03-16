interface IColorRGB {
  r: number,
  g: number,
  b: number
}

const _errorPrefix = 'Uncaught TypeError: Failed to execute \'check\' method: ';

export function check (srcObj: CanvasImageSource, srcWidth: number, srcHeight: number, colorRGB?: IColorRGB, alpha?: number) {
  let baseColor: IColorRGB;

  // argument validation
  if (!srcObj || typeof srcObj !== 'object') {
    throw new Error(_errorPrefix + 'The type of argument \'srcObj\' is invalid.');
  }
  if (srcWidth === undefined || srcWidth <= 0) {
    throw new Error(_errorPrefix + 'The type of argument \'srcWidth\' is invalid.');
  }
  if (srcHeight === undefined || srcHeight <= 0) {
    throw new Error(_errorPrefix + 'The type of argument \'srcHeight\' is invalid.');
  }

  if (colorRGB && colorRGB.r >= 0 && colorRGB.g >= 0 && colorRGB.b >= 0) {
    baseColor = colorRGB;
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = Math.ceil(srcWidth * 0.5);
  canvas.height = Math.ceil(srcHeight * 0.5);
  ctx.drawImage(srcObj, 0, 0, canvas.width, canvas.height);

  const pixel = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pd = pixel.data;
  for (let i = 0; i < pd.length; i+=4) {
    if (i === 0 && colorRGB === undefined) {
      baseColor = {
        r: pd[0],
        g: pd[1],
        b: pd[2]
      };
    }
    if (pd[i] !== baseColor.r || pd[i+1] !== baseColor.g || pd[i+2] !== baseColor.b) {
      return false;
    }
    if (alpha !== undefined && alpha >= 0 && pd[i+3] !== alpha) {
      return false;
    }
  }
  return true;
}