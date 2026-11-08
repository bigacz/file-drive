import multer from 'multer';

const getIndex = [
  (req, res) => {
    res.render('storage');
  },
];

const upload = multer({ dest: 'uploads/' });

const postIndex = [upload.single('file'), (req, res) => {}];

export default {
  getIndex,
  postIndex,
};
