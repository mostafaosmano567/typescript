"use strict";
//==================1================
class User {
    id;
    name;
    email;
    _password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, _password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this._password = _password;
        this.phone = phone;
        this.age = age;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this._age = value;
    }
    displayInfo() {
        console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }
}
//==================2================
class Admin extends User {
    manageNotes(notes, action, note) {
        if (action === "create") {
            notes.push(note);
        }
        else {
            const index = notes.indexOf(note);
            if (index !== -1) {
                notes.splice(index, 1);
            }
        }
    }
}
//==================3================
class UserNote {
    id;
    title;
    content;
    userId;
    author;
    constructor(id, title, content, userId, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.author = author;
    }
    preview() {
        return this.content.substring(0, 20) + "...";
    }
}
//==================4================
class NoteBook {
    id;
    name;
    notes = [];
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addNote(id, title, content, author) {
        this.notes.push(new UserNote(id, title, content, author.id, author));
    }
    removeNote(id) {
        this.notes = this.notes.filter((n) => n.id !== id);
    }
    getNotes() {
        return this.notes;
    }
}
//==================5================
function addNotebook(user, book) {
    user.notebooks.push(book);
}
function removeNotebook(user, book) {
    const index = user.notebooks.indexOf(book);
    if (index !== -1) {
        user.notebooks.splice(index, 1);
    }
}
//==================6================
function getNotesByAuthor(notes, author) {
    return notes.filter((n) => n.author === author);
}
//==================7================
class GenericStorage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
    getAllItems() {
        return this.items;
    }
}
