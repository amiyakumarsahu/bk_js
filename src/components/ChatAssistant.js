import React, { useState, useRef, useEffect } from 'react';

function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! How can I help you with your supply chain analytics today?' },
  ]);
  const [input, setInput] = useState('');
  const [waiting, setWaiting] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, waiting]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setWaiting(true);
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { role: 'bot', content: 'This is a mock AI response. (Integrate backend for real answers.)' },
      ]);
      setWaiting(false);
    }, 1200);
  };

  // Auto-grow textarea up to 3 lines
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const maxHeight = 3 * 24 + 16; // 3 lines * line-height + padding
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
    }
  }, [input]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 400, maxHeight: 600, height: '70vh', background: '#fff', borderRadius: 18, boxShadow: '0 8px 15px rgba(0,0,0,0.08)' }}>
      <div style={{ padding: '18px 24px 0 24px', borderBottom: '1px solid #f2f2f2' }}>
        <h3 style={{ margin: 0 }}>🤖 Financial Assistant</h3>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 24px', background: '#fafbfc' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: '75%',
                padding: '0.5rem 1rem',
                borderRadius: '1.2rem',
                background: msg.role === 'user' ? '#e1ecf4' : '#d2f8d2',
                color: '#000',
                fontSize: '1rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                wordBreak: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {waiting && (
          <div style={{ color: '#888', fontStyle: 'italic', marginLeft: 8 }}>Bot is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ borderTop: '1px solid #f2f2f2', padding: '16px 24px', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            style={{
              flex: 1,
              minHeight: 36,
              maxHeight: 88,
              resize: 'none',
              borderRadius: 8,
              border: '1px solid #ccc',
              padding: '10px',
              fontSize: '1rem',
              lineHeight: '1.5',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
            disabled={waiting}
            rows={1}
            maxLength={1000}
          />
          <button
            onClick={handleSend}
            style={{ background: '#FF6B35', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', minHeight: 36 }}
            disabled={waiting}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatAssistant; 