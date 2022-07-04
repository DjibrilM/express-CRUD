import multer from "multer";

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/data/images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  });
  

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  



const mullterConfig = class {
static mullterConfig (app){
    app.use(
        multer({ storage: fileStorage, fileFilter: fileFilter }).array('files',10)
      );    
}
}


export default mullterConfig