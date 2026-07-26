import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { diskStorage, type StorageEngine } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadResponseDto } from './dto/upload-response.dto';

const uploadsDir = join(process.cwd(), 'uploads');

const storage: StorageEngine = diskStorage({
  destination: uploadsDir,
  filename: (_req, file, callback) => {
    const extension = extname(file.originalname).toLowerCase() || '.png';
    callback(null, `${randomUUID()}${extension}`);
  },
});

interface UploadedImageFile {
  filename: string;
}

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Enviar imagem de thumbnail' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiCreatedResponse({ type: UploadResponseDto })
  @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          callback(new Error('Apenas imagens são permitidas'), false);
          return;
        }

        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: UploadedImageFile): UploadResponseDto {
    return { url: `/uploads/${file.filename}` };
  }
}
