import React, { useState } from "react";

export default function App() {
  const [books, setBooks] = useState([
    { title: "Micul Prinț", pagesRead: 13, totalPages: 290 },
    { title: "Puterea Prezentului", pagesRead: 40, totalPages: 210 },
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Jurnal de lectură</h1>
      {books.map((book, idx) => (
        <div key={idx} style={{ marginBottom: 20 }}>
          <h3>{book.title}</h3>
          <p>{book.pagesRead} din {book.totalPages} pagini</p>
        </div>
      ))}
    </div>
  );
}
