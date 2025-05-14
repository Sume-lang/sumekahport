import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable();
  const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve([fields, files]);
    });
  });
  
  console.log('Request fields:', fields); // Use the fields variable

  const file = files.file as formidable.File | undefined;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileData = await fs.readFile(file.filepath);

    const response = await axios.post(
        'https://srv183.niagahoster.com:2083/cpsess2761148929/frontend/jupiter/filemanager/index.html', // To set up API access: 1. Navigate to cPanel > Advanced > API > API Tokens. 2. Create a new token with "upload_files" permissions. 3. Manage API Tokens and retrieve the base64 encoded string from the "API Token" field. 4. Use this string as the "Authorization" header value in your code.
        {
          dir: 'public_html/images/profiles',
          file: file.originalFilename,
          data: fileData.toString('base64'),
        },
        {
          auth: {
            username: 'u1485949',
            password: '@Lombok#2025',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.status === 200) {
        // Upload was successful, do something
      } else {
        // Upload failed, do something else
      }
    await fs.unlink(file.filepath);

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.originalFilename}`,
    });
  } catch (error) {
    console.error('Upload error:', error);

    try {
      await fs.unlink(file.filepath);
    } catch (cleanupError) {
      console.error('Failed to clean up temporary file:', cleanupError);
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to upload file to server',
    });
  }
}



// UQ0DXN0GER2ZXQZSXY8KWIRIHQS9VQ4G

// PS4AN77BGOAQ0H3WVVB8FX9VCXSA8QZS