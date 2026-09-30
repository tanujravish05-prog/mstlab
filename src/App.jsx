import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  const limit = 100;
  const charCount = text.length;
  const isOver = charCount > limit;
  const isEmpty = text.trim().length === 0;
  const isDisabled = isEmpty || isOver;

  const handlePost = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      setPosts([text, ...posts]);
      setText('');
    }
  };

  return (
    <div className="container">
      <h1>Post Box</h1>
      <form onSubmit={handlePost}>
        {/* Requirement 1: Controlled Textarea */}
        <textarea
          rows="4"
          placeholder="What's on your mind? (Max 100 characters)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={isOver ? 'error-border' : ''}
        />

        {/* Requirement 2: Live counter */}
        <div className={`counter ${isOver ? 'over' : ''}`}>
          {charCount} / {limit}
        </div>

        {/* Requirement 3: Limit exceeded message */}
        {isOver && <div className="error">Limit exceeded</div>}

        {/* Requirement 4: Disabled Post button */}
        <button type="submit" disabled={isDisabled}>
          Post
        </button>
      </form>

      {/* Published posts feed */}
      {posts.length > 0 && (
        <ul className="posts">
          {posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
