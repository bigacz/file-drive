import multer from 'multer';
import prisma from '../prisma/prisma.js';
import { matchedData, validationResult } from 'express-validator';
import { getIndexValidators } from './validators.js';

const getIndex = [
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json('You are not logged in!');
    }
  },
  ...getIndexValidators,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

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
  upload.single('file'),
  async (req, res) => {
    const createFile = await prisma.file.create({
      data: {
        ownerId: req.user.id,
        folder: req.user.folder,
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
