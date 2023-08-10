import html2canvas from 'html2canvas';

export const captureScreenshotAndDownload = async (name:string, hash: string) => {
  const body = document.body;

  const canvas = await html2canvas(body);
  const date = new Date();
  const imageBlob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(resolve as BlobCallback, 'image/png')
  );

  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(imageBlob);
  downloadLink.download = `screenshot_${name}_${hash}.png`;
  downloadLink.click();
};
