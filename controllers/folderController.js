import { matchedData } from 'express-validator';
import redirectOnUnauthenticated from '../middleware/redirectOnUnauthenticated.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import {
  getFolderValidators,
  postFolderValidators,
} from './folderValidators.js';
import prisma from '../prisma/prisma.js';
import multer from 'multer';

const getFolder = [
  redirectOnUnauthenticated,
  ...getFolderValidators,
  validationMiddleware,
  async (req, res) => {
    const { path } = matchedData(req);

    const whereStatement = generateWhereStatement(path, req.user.id);

    const currentFolder = await prisma.folder.findFirst({
      where: whereStatement,
      include: {
        files: true,
        childFolders: true,
      },
    });

    return res.render('folder', { currentFolder, currentPath: path });
  },
];

const upload = multer({ dest: 'uploads/' });

const postFolder = [
  redirectOnUnauthenticated,
  ...postFolderValidators,
  validationMiddleware,
  upload.single('file'),
  async (req, res) => {
    let { path, folderName } = matchedData(req);

    const whereStatement = generateWhereStatement(path, req.user.id);

    const currentFolder = await prisma.folder.findFirst({
      where: whereStatement,
      include: {
        files: true,
        childFolders: true,
      },
    });

    await prisma.folder.create({
      data: {
        folderName,
        ownerId: req.user.id,
        parentFolderId: currentFolder.id,
      },
    });
  },
];

const patchFolder = [redirectOnUnauthenticated, validationMiddleware];

const deleteFolder = [redirectOnUnauthenticated, validationMiddleware];

export default { getFolder, postFolder, patchFolder, deleteFolder };

function generateWhereStatement(path, ownerId) {
  let whereStatement;

  const folderNames = path.split('/').toReversed();

  const currentFolderName = folderNames.shift();

  whereStatement = {
    folderName: currentFolderName,
    ownerId: ownerId,
  };

  const oldestFolder = folderNames.reduce((currentObject, folderName) => {
    currentObject.parentFolder = {
      folderName,
      ownerId: ownerId,
    };

    return currentObject.parentFolder;
  }, whereStatement);

  oldestFolder.parentFolderId = null;

  return whereStatement;
}
