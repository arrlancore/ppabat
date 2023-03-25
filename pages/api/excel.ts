/* eslint-disable */
import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import xlsx from 'xlsx';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp.xlsx');
  },
});

const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(upload.any());

apiRoute.post((req, res) => {
  try {
    const rawFile = (req as any).files[0];
    const file = xlsx.readFile(rawFile.path);
    const data: { [key: string]: unknown } = {};

    file.SheetNames.forEach((sheetName) => {
      data[sheetName] = xlsx.utils.sheet_to_json(file.Sheets[sheetName]);
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('err', error);
    throw error;
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
