import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from '../posts/post.modele';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post()
  //@UseInterceptors(FileInterceptor('image')) - добавляем для работы с файлами // image - название переменной в которую кладём сущность/файл
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.createPost(dto, image);
  }
}
