import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;
  constructor() {
    this.messagesService = new MessagesService();
  }
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log({ body });
    return this.messagesService.create(body.content);
    return 'create message';
  }

  @Get('/:id')
  getMessage(@Param('id') id: number, @Query('test') test: string) {
    console.log({ id, test });
    return this.messagesService.findOne(`${id}`);
    return 'Get specific message ' + id;
  }
}
