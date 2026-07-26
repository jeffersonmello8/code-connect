import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({ example: '/uploads/abc123.png' })
  url: string;
}
