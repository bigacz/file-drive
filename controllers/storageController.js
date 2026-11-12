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

    let whereStatement;

    let path = folder;
    if (!folder || folder.trim() === '') {
      path = 'index';
    }

    const folders = path.split('/').toReversed();

    const currentFolderName = folders.shift();

    whereStatement = {
      folderName: currentFolderName,
      ownerId: req.user.id,
    };

    const oldestFolder = folders.reduce((currentObject, folderName) => {
      currentObject.parentFolder = {
        folderName,
        ownerId: req.user.id,
      };

      return currentObject.parentFolder;
    }, whereStatement);

    oldestFolder.parentFolderId = null;

    const currentFolder = await prisma.folder.findFirst({
      where: whereStatement,
      include: {
        files: true,
        childFolders: true,
      },
    });

    return res.render('storage', { currentFolder, currentPath: path });
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
