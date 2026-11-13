// async function addFile(path, ownerId, file) {
//   const currentFolder = getFolder(path, ownerId);

//   await prisma.file.create({
//     data: {
//       ownerId: ownerId,
//       folderId: currentFolder.id,
//       filename: file.filename,
//       originalFilename: file.originalname,
//       mimetype: file.mimetype,
//       size: file.size,
//     },
//   });
// }
