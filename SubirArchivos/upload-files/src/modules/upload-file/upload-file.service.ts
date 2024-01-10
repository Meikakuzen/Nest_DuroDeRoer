import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { existsSync } from 'fs';

@Injectable()
export class UploadFileService {
  
  
  uploadFile(file: Express.Multer.File) {
    if(file){
      const response = {
        originalName: file.originalname,
        filename: file.filename
      }
      return response
    }
    return null
  }
  uploadFiles(files: Express.Multer.File[]){
    const responses = []

    for(const file of files){
      const fileUpload = this.uploadFile(file)
      if(fileUpload){
        responses.push(fileUpload)
      }
    }

    return responses
  }

  download(res, filename: string){

    if(existsSync('./upload/'+ filename)){
      
      return res.download('./upload/' + filename)
    }

    return new NotFoundException("El fichero no existe")

  }

  findAll() {
    return `This action returns all uploadFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  update(id: number, updateUploadFileDto: UpdateUploadFileDto) {
    return `This action updates a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
