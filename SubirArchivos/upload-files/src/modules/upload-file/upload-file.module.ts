import { ConflictException, Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[
    MulterModule.register({
      limits:{
        fileSize: 2 * 1024 *1024
      },
      fileFilter: function(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(new ConflictException("Solo imágenes"), false)
        }
        return cb(null, true)
      },
      storage: diskStorage({
        destination: function(req,file,cb){
          cb(null, './upload')
        },
        filename: function(req,file,cb){
          let filenameParts = file.originalname.split('.')
          filenameParts = filenameParts.slice(0, filenameParts.length -1)
          const filename = filenameParts.join('.')

          if(file.mimetype){
            let ext = file.mimetype.split('/')[1]
            cb(null, filename + '-'+ Date.now()+ '.'+ ext)
          }else{
            cb(null, filename + '-'+ Date.now())
          }
        }
      })
    })
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService]
})
export class UploadFileModule {}
