import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Note } from './note.interface';

@Injectable()
export class NotesService {
  private notes: Note[] = [
    {
      id: randomUUID(),
      title: 'Welcome to Notes',
      content: 'This is your first note. Click it to edit, or create a new one!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(): Note[] {
    return [...this.notes].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  findOne(id: string): Note {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  create(title: string, content: string): Note {
    const now = new Date().toISOString();
    const note: Note = {
      id: randomUUID(),
      title: title?.trim() || 'Untitled',
      content: content || '',
      createdAt: now,
      updatedAt: now,
    };
    this.notes.push(note);
    return note;
  }

  update(id: string, title: string, content: string): Note {
    const note = this.findOne(id);
    note.title = title?.trim() || note.title;
    note.content = content ?? note.content;
    note.updatedAt = new Date().toISOString();
    return note;
  }

  remove(id: string): void {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    this.notes.splice(index, 1);
  }
}
