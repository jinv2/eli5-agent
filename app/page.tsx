'use client';
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Page() {
  const [apiKey, setApiKey] = useState('');
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { data: { apiKey } }
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#00ff9d', textAlign: 'center' }}>ELI5 解释器 👶</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
        输入任何复杂的概念，我像给5岁小孩讲故事一样解释给你听。
      </p>

      {/* 1. 输入 Key */}
      <div style={{ background: '#222', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#aaa' }}>Step 1: 你的 OpenAI Key</p>
        <input 
          type="password" 
          value={apiKey} 
          onChange={e => setApiKey(e.target.value)} 
          placeholder="sk-..."
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#000', color: '#fff', boxSizing: 'border-box' }}
        />
      </div>

      {/* 2. 聊天区域 */}
      <div style={{ minHeight: '300px', marginBottom: '20px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ 
            background: m.role === 'user' ? '#333' : '#00442a', 
            padding: '15px', 
            borderRadius: '10px', 
            marginBottom: '10px',
            lineHeight: '1.6'
          }}>
            <strong style={{ display: 'block', marginBottom: '5px', color: m.role === 'user' ? '#aaa' : '#00ff9d' }}>
              {m.role === 'user' ? '你' : '智能体'}
            </strong>
            {m.content}
          </div>
        ))}
      </div>

      {/* 3. 输入框 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="例如：什么是量子计算？为什么天空是蓝的？"
          style={{ flex: 1, padding: '15px', borderRadius: '30px', border: 'none', background: '#333', color: '#fff', outline: 'none' }}
        />
        <button 
          type="submit" 
          disabled={!apiKey || isLoading}
          style={{ padding: '15px 25px', borderRadius: '30px', border: 'none', background: apiKey ? '#00ff9d' : '#555', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
        >
          发送
        </button>
      </form>
    </div>
  );
}
