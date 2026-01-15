import { useState, useRef, useEffect } from 'react';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 AI 助手，有什么可以帮助你的吗？',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 模拟 AI 回复
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `我收到了你的消息："${userMessage.content}"。这是一个模拟回复。在实际应用中，这里会调用 AI API 来生成回复。`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles["chat-window"]}>
      <div className={styles["chat-header"]}>
        <div className={styles["chat-header-content"]}>
          <div>
            <h2 className={styles["chat-header-title"]}>你好,</h2>
            <p className={styles["chat-header-subtitle"]}>我今天能帮你什么？</p>
          </div>
        </div>
      </div>

      <div className={styles["chat-messages"]}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles["chat-message"]} ${message.role === 'user' ? styles["user-message"] : styles["assistant-message"]}`}
          >
            <div className={styles["message-avatar"]}>
              {message.role === 'user' ? (
                <UserOutlined />
              ) : (
                <RobotOutlined />
              )}
            </div>
            <div className={styles["message-content"]}>
              <div className={styles["message-text"]}>{message.content}</div>
              <div className={styles["message-time"]}>{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles["chat-message"]} ${styles["assistant-message"]}`}>
            <div className={styles["message-avatar"]}>
              <RobotOutlined />
            </div>
            <div className={styles["message-content"]}>
              <div className={styles["message-text"]}>
                <span className={styles["typing-indicator"]}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles["chat-input-container"]}>
        <div className={styles["chat-input-wrapper"]}>
          <textarea
            ref={inputRef}
            className={styles["chat-input"]}
            placeholder="输入消息... (Shift + Enter 换行)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{
              resize: 'none',
              minHeight: '44px',
              maxHeight: '120px',
            }}
          />
          <button
            className={styles["chat-send-button"]}
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;