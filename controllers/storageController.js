import multer from 'multer';
import prisma from '../prisma/prisma.js';
import { matchedData, validationResult } from 'express-validator';
import { getIndexValidators, postIndexValidators } from './validators.js';
import validationMiddleware from '../middleware/validationMiddleware.js';

const getIndex = [
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json('You are not logged in!');
    }
  },
  ...getIndexValidators,
  validationMiddleware,
  async (req, res) => {
    const { folder } = matchedData(req);

    let files;

    if (folder == null) {
      files = await prisma.file.findMany({
        where: {
          ownerId: req.user.id,
          folder: null,
        },
      });
    } else {
      files = await prisma.file.findMany({
        where: {
          ownerId: req.user.id,
          folder: folder,
        },
      });
    }

    const folders = await prisma.file.findMany({
      select: {
        folder: true,
      },
      distinct: ['folder'],
    });

    const folderNames = folders.map((folder) => folder.folder);

    res.render('storage', { files, folderNames, currentFolder: folder });
  },
];

const upload = multer({ dest: 'uploads/' });

const postIndex = [
  ...postIndexValidators,
  validationMiddleware,
  upload.single('file'),
  async (req, res) => {
    let { folder } = matchedData(req);

    const createFile = await prisma.file.create({
      data: {
        ownerId: req.user.id,
        folder: folder.trim() === '' ? null : folder,
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
