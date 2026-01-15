import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminPanel from '../../components/AdminPanel';
import ChatWindow from '../../components/ChatWindow';
import ResizableLayout from '../../components/ResizableLayout';
import styles from './index.module.scss';

function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={styles["home-page-layout"]}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapse={setSidebarCollapsed} 
      />
      <ResizableLayout
        left={<AdminPanel />}
        right={<ChatWindow />}
      />
    </div>
  );
}

export default HomePage;