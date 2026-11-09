import multer from 'multer';
import prisma from '../prisma/prisma.js';

const getIndex = [
  async (req, res) => {
    if (req.isAuthenticated()) {
      const files = await prisma.file.findMany({
        where: {
          ownerId: req.user.id,
        },
      });

      res.render('storage', { files });
    } else {
      res.json('You are not logged in!');
    }
  },
];

const upload = multer({ dest: 'uploads/' });

const postIndex = [
  upload.single('file'),
  async (req, res) => {
    debugger;
    const createFile = await prisma.file.create({
      data: {
        ownerId: req.user.id,
        folder: 'index',
        filename: req.file.filename,
        originalFilename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  },
];

export default {
  getIndex,
  postIndex,
};
