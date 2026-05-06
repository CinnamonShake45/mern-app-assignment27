import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  
  // State for the Create form
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  // READ Operation
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // CREATE Operation
  const handleAddBook = async (e) => {
    e.preventDefault();
    
    // In a real app, you'd select existing authors/categories from a dropdown.
    // For this simple demo, we will pass strings and let the backend handle it.
    try {
      await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title,
          authorName: authorName, 
          categoryName: categoryName 
        }),
      });
      
      // Clear form and refresh list
      setTitle('');
      setAuthorName('');
      setCategoryName('');
      fetchBooks(); 
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // DELETE Operation
  const deleteBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE' });
      fetchBooks(); // Refresh list after deletion
    } catch (error) {
       console.error("Error deleting book:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h1>Library CRUD Dashboard</h1>
      
      {/* CREATE FORM */}
      <div style={{ background: '#333', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
        <h2>Add a New Book</h2>
        <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Book Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" 
            placeholder="Author Name (One-to-Many)" 
            value={authorName} 
            onChange={(e) => setAuthorName(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <input 
            type="text" 
            placeholder="Category (Many-to-Many)" 
            value={categoryName} 
            onChange={(e) => setCategoryName(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Add Book
          </button>
        </form>
      </div>

      {/* READ / DELETE DISPLAY */}
      <div className="book-list">
        <h2>Book Inventory</h2>
        {books.length === 0 ? <p>No books found. Add one above!</p> : null}
        
        {books.map((book) => (
          <div key={book._id} style={{ border: '1px solid gray', margin: '10px 0', padding: '15px', borderRadius: '8px', background: '#222' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{book.title}</h3>
            
            {/* Displaying One-to-Many Relationship */}
            <p style={{ margin: '5px 0' }}><strong>Author:</strong> {book.author?.name || 'Unknown'}</p>
            
            {/* Displaying Many-to-Many Relationship */}
            <p style={{ margin: '5px 0' }}><strong>Categories:</strong> 
              {book.categories && book.categories.map(cat => (
                <span key={cat._id} style={{ marginLeft: '5px', background: '#555', padding: '3px 8px', borderRadius: '4px', fontSize: '0.9em' }}>
                  {cat.name}
                </span>
              ))}
            </p>
            
            <button onClick={() => deleteBook(book._id)} style={{ marginTop: '10px', padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;