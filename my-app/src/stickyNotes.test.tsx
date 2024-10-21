import { render, screen, fireEvent, within } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
    render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
    });

    test("read", () => {
        render(<StickyNotes />);
        const noteItems = screen.getAllByTestId((id) => id.startsWith('note-container-'));
        expect(noteItems).toHaveLength(dummyNotesList.length);
    });

    test("update", () => {
        render(<StickyNotes />);
        const firstNoteContent = screen.getByTestId("note-content-1");
        fireEvent.blur(firstNoteContent, { target : { innerText: 'Updated Content' } });
        expect(firstNoteContent.textContent).toBe("Updated Content");
    });

    test("delete", () => {
        render(<StickyNotes />);
        const deleteButton = screen.getByTestId("delete-note-1");
        fireEvent.click(deleteButton);
        expect(screen.queryByTestId("note-1")).not.toBeInTheDocument();
    });

    test("fav", () => {
        render(<StickyNotes />);
        const noteId = 1;
        const noteTitle = "test note 6 title";
        const favButton = screen.getByTestId(`favorite-${noteId}`);
        fireEvent.click(favButton);

        const favoritesList = screen.getByText("List of Favorites:");
        expect (favoritesList).toBeInTheDocument();

        const favoriteItem = screen.getByText(noteTitle);
        expect(favoriteItem).toBeInTheDocument();

        expect(favButton.textContent).toBe('❤️');
    })
});