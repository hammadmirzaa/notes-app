import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.notesService.create(body.title, body.content);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ) {
    return this.notesService.update(id, body.title, body.content);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.notesService.remove(id);
    return { success: true };
  }
}
