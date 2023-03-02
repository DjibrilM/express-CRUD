import fs from 'fs'

const deleteFile = (filePath,cb)  => {
    fs.unlink(filePath, (err => {
        if (err) {
          console.log('faild to delete the following file',err)
          cb()
            
      }
  }))
}



export default deleteFile
