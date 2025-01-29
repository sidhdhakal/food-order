const sharp = require('sharp');

exports.optimizeBase64Image=async (base64Str)=>{
  try {
    const base64Data = base64Str.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const buffer = Buffer.from(base64Data, 'base64');

    const optimizedBuffer = await sharp(buffer)
      .resize(500, 500) 
      .webp({ quality: 100 })
      .toBuffer(); 

    const optimizedBase64 = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;

    return optimizedBase64;
  } catch (err) {
    console.error('Error processing base64 image:', err);
  }
}

