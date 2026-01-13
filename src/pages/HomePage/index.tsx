import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminPanel from '../../components/AdminPanel';
import ChatWindow from '../../components/ChatWindow';
import ResizableLayout from '../../components/ResizableLayout';
import './index.scss';

function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="home-page-layout">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapse={setSidebarCollapsed} 
      />
      <ResizableLayout
        left={<AdminPanel />}
        right={<ChatWindow />}
        defaultRightWidth={300}
        minLeftWidth={400}
        minRightWidth={300}
      />
    </div>
  );
}

export default HomePage;