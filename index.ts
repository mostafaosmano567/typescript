//==================1================

class User {
  private _age!: number;
  public notebooks: NoteBook[] = [];

  constructor(
    public id: number,
    public name: string,
    public email: string,
    private _password: string,
    protected phone: string,
    age: number
  ) {
    this.age = age;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  displayInfo(): void {
    console.log(
      `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`
    );
  }
}

//==================2================
class Admin extends User {
  manageNotes(
    notes: UserNote[],
    action: "create" | "delete",
    note: UserNote
  ): void {
    if (action === "create") {
      notes.push(note);
    } else {
      const index = notes.indexOf(note);
      if (index !== -1) {
        notes.splice(index, 1);
      }
    }
  }
}

//==================3================
class UserNote {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public userId: User["id"],
    public author: User
  ) {}

  preview(): string {
    return this.content.substring(0, 20) + "...";
  }
}

//==================4================
class NoteBook {
  private notes: UserNote[] = [];

  constructor(public id: number, public name: string) {}

  addNote(id: number, title: string, content: string, author: User): void {
    this.notes.push(new UserNote(id, title, content, author.id, author));
  }

  removeNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  getNotes(): UserNote[] {
    return this.notes;
  }
}

//==================5================

function addNotebook(user: User, book: NoteBook): void {
  user.notebooks.push(book);
}

function removeNotebook(user: User, book: NoteBook): void {
  const index = user.notebooks.indexOf(book);
  if (index !== -1) {
    user.notebooks.splice(index, 1);
  }
}

//==================6================

function getNotesByAuthor(notes: UserNote[], author: User): UserNote[] {
  return notes.filter((n) => n.author === author);
}

//==================7================

class GenericStorage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getAllItems(): T[] {
    return this.items;
  }
}