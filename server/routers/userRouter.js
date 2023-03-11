import express from 'express';
// import multer from 'multer'
const router=express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now()+".jpg"
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
// const upload = multer({ storage: storage })


router.get("/", (req, res)=>{res.json("hai")})

export default router