'use client';
// 关键修改：从专用包引入 useChat
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Page() {
  const [apiKey, setApiKey] = useState('');
  
  // 将 Key 传给后端
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { data: { apiKey } }
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00ff9d', textAlign: 'center' }}>ELI5 解释器 👶</h1>
      
      {/* Key 输入区 */}
      <div style={{ background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#888' }}>OPENAI API KEY</p>
        <input 
          type="password" 
          value={apiKey} 
          onChange={e => setApiKey(e.target.value)} 
          placeholder="sk-..."
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#000', color: '#fff' }}
        />
      </div>

      {/* 聊天区 */}
      <div style={{ minHeight: '300px', marginBottom: '20px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ 
            background: m.role === 'user' ? '#333' : '#00442a', 
            color: '#fff',
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '10px',
            lineHeight: '1.5'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: '5px' }}>
              {m.role === 'user' ? 'YOU' : 'ELI5 AGENT'}
            </div>
            {m.content}
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="问我任何问题..."
          style={{ flex: 1, padding: '12px', borderRadius: '20px', border: 'none', background: '#333', color: '#fff', outline: 'none' }}
        />
        <button 
          type="submit" 
          disabled={!apiKey || isLoading}
          style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', background: apiKey ? '#00ff9d' : '#444', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
        >
          发送
        </button>
      </form>
    </div>
  );
}
