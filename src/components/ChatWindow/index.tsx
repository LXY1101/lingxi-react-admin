import { useState, useRef, useEffect } from 'react';
import { 
  SendOutlined, 
  UserOutlined, 
  RobotOutlined,
  MessageOutlined,
  CloseOutlined,
  SettingOutlined,
  BulbOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  PaperClipOutlined,
  HistoryOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './index.scss';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
interface ChatWindowProps {
  selectedElement?: any;
  selectedProject?: any;
}

function ChatWindow({ selectedElement, selectedProject }: ChatWindowProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 AI 开发助手。我会根据你当前的操作上下文，主动为你提供智能建议。',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 处理拖拽调整宽度
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      // 计算新宽度（从右边缘向左拖动）
      const newWidth = window.innerWidth - e.clientX;
      
      // 限制宽度范围：最小 400px，最大 1000px
      if (newWidth >= 400 && newWidth <= 1000) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // 基于上下文的智能Tag推荐
  const getContextualTags = () => {
    if (selectedElement) {
      if (selectedElement.type === 'text') {
        return [
          { icon: BulbOutlined, label: '修改文字颜色', color: 'purple', action: 'change-text-color' },
          { icon: CodeOutlined, label: '调整字体大小', color: 'blue', action: 'adjust-font-size' },
          { icon: BulbOutlined, label: '优化文案内容', color: 'indigo', action: 'optimize-text-content' },
          { icon: DatabaseOutlined, label: '添加文字动效', color: 'violet', action: 'add-text-animation' }
        ];
      }
      
      if (selectedElement.type === 'button') {
        return [
          { icon: BulbOutlined, label: '更换按钮样式', color: 'purple', action: 'change-button-style' },
          { icon: CodeOutlined, label: '添加点击事件', color: 'blue', action: 'add-click-event' },
          { icon: BulbOutlined, label: '优化按钮文案', color: 'indigo', action: 'optimize-button-text' },
          { icon: DatabaseOutlined, label: '添加悬停效果', color: 'violet', action: 'add-hover-effect' }
        ];
      }
      
      if (selectedElement.type === 'header') {
        return [
          { icon: BulbOutlined, label: '调整导航配色', color: 'purple', action: 'adjust-header-color' },
          { icon: CodeOutlined, label: '添加下拉菜单', color: 'blue', action: 'add-dropdown-menu' },
          { icon: BulbOutlined, label: '优化响应式布局', color: 'indigo', action: 'optimize-header-responsive' },
          { icon: DatabaseOutlined, label: '添加搜索功能', color: 'slate', action: 'add-search-function' }
        ];
      }
    }

    if (selectedElement && selectedElement.type === 'project') {
      return [
        { icon: CodeOutlined, label: '生成API文档', color: 'blue', action: 'generate-docs' },
        { icon: BulbOutlined, label: '调整设计风格', color: 'purple', action: 'adjust-design' },
        { icon: DatabaseOutlined, label: '优化数据模型', color: 'slate', action: 'optimize-db' }
      ];
    }

    // 默认建议
    return [
      { icon: BulbOutlined, label: '创建新页面', color: 'blue', action: 'create-page' },
      { icon: CodeOutlined, label: '查看项目模板', color: 'purple', action: 'view-templates' },
      { icon: DatabaseOutlined, label: '数据库配置', color: 'slate', action: 'db-config' }
    ];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content?: string) => {
    const messageContent = content || inputValue;
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
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
        content: `好的，我理解你想要：${messageContent}。我会帮你处理这个需求。`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleTagClick = (action: string) => {
    const tagMessages: Record<string, string> = {
      'create-project': '帮我创建一个新项目',
      'view-templates': '显示可用的项目模板',
      'db-config': '配置数据库连接',
      'generate-docs': '为当前项目生成API文档',
      'adjust-design': '调整项目的设计风格',
      'optimize-db': '优化当前的数据模型',
      'change-text-color': '修改文字颜色',
      'adjust-font-size': '调整字体大小',
      'optimize-text-content': '优化文案内容',
      'add-text-animation': '添加文字动效',
      'change-button-style': '更换按钮样式',
      'add-click-event': '添加点击事件',
      'optimize-button-text': '优化按钮文案',
      'add-hover-effect': '添加悬停效果',
      'adjust-header-color': '调整导航配色',
      'add-dropdown-menu': '添加下拉菜单',
      'optimize-header-responsive': '优化响应式布局',
      'add-search-function': '添加搜索功能',
      'create-page': '创建新页面'
    };

    const message = tagMessages[action] || action;
    handleSend(message);
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

  // 如果折叠，显示展开按钮
  if (collapsed) {
    return (
      <div className="chat-collapsed">
        <button
          onClick={() => setCollapsed(false)}
          className="chat-collapse-button"
        >
          <MessageOutlined />
        </button>
      </div>
    );
  }

  const contextualTags = getContextualTags();

  return (
    <>
      {/* 关闭按钮 */}
      <button
        onClick={() => setCollapsed(true)}
        className="chat-close-button"
        style={{ right: (width + 16) + 'px' }}
      >
        <CloseOutlined />
      </button>

      <div className="chat-window" style={{ width: width + 'px' }}>
        {/* 拖拽手柄 */}
        <div
          className={`chat-resize-handle ${isResizing ? 'resizing' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
          }}
        >
          <div className="resize-indicator"></div>
        </div>

        {/* 头部 */}
        <div className="chat-header">
          <div className="chat-header-content">
            <div>
              <h2 className="chat-header-title">你好,</h2>
              <p className="chat-header-subtitle">我今天能帮你什么？</p>
            </div>
            <button className="chat-header-settings">
              <SettingOutlined />
            </button>
          </div>
        </div>

        {/* AI 建议 Tags */}
        <div className="chat-tags-section">
          <div className="chat-tags-container">
            {contextualTags.map((tag, index) => {
              const Icon = tag.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleTagClick(tag.action)}
                  className="chat-tag-button"
                  style={{ borderColor: `var(--ant-${tag.color}-5)` }}
                >
                  <Icon style={{ color: `var(--ant-${tag.color}-5)` }} />
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>

          {selectedElement && (
            <div className="chat-context-info">
              <p>
                <strong>当前上下文:</strong> {(() => {
                  const typeLabels: Record<string, string> = {
                    'text': '文本元素',
                    'button': '按钮元素',
                    'header': '页面头部',
                    'section': '区块模块',
                    'footer': '页面底部',
                    'project': '项目卡片'
                  };
                  return typeLabels[selectedElement.type] || selectedElement.label || '未知元素';
                })()}
                {selectedElement.label && selectedElement.type !== 'project' && (
                  <> - {selectedElement.label}</>
                )}
              </p>
            </div>
          )}
        </div>

        {/* 消息区域 */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className={`message-avatar ${message.role}`}>
                {message.role === 'user' ? (
                  <UserOutlined />
                ) : (
                  <RobotOutlined />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message assistant-message">
              <div className="message-avatar assistant">
                <RobotOutlined />
              </div>
              <div className="message-content">
                <div className="message-text">
                  <span className="typing-indicator">
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

        {/* 底部工具栏 */}
        <div className="chat-toolbar">
          <div className="toolbar-left">
            <button className="toolbar-button">
              <RobotOutlined className="toolbar-icon" />
              思考
            </button>
            <button className="toolbar-button">
              <ThunderboltOutlined className="toolbar-icon" />
              Deep Research
            </button>
          </div>
          <div className="toolbar-right">
            <button className="toolbar-icon-button" title="附件上传">
              <PaperClipOutlined />
            </button>
            <button className="toolbar-icon-button" title="聊天历史">
              <HistoryOutlined />
            </button>
            <button className="toolbar-icon-button" title="新聊天">
              <PlusOutlined />
            </button>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <div className="input-icon">
              <BulbOutlined />
            </div>
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="其他提问、@提出、/提示"
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
              className="chat-send-button"
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isLoading}
            >
              <SendOutlined />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatWindow;