import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./index.scss";
import { RightOutlined, MessageOutlined } from "@ant-design/icons";

interface ResizableLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultRightWidth?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

function ResizableLayout({
  left,
  right,
  defaultRightWidth = 400,
  minLeftWidth = 0,
  minRightWidth = 300,
}: ResizableLayoutProps) {
  const location = useLocation();
  const hideAI =
    location.pathname.startsWith("/admin/profile") ||
    location.pathname.startsWith("/admin/setting");
  const [collapsed, setCollapsed] = useState(false);
  const [rightWidth, setRightWidth] = useState(defaultRightWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const deltaX = dragStartX.current - e.clientX; // 反向，因为拖拽左侧边界
      const newRightWidth = dragStartWidth.current + deltaX;

      // 限制在最小和最大宽度之间
      const maxRightWidth = containerWidth - minLeftWidth;
      const clampedWidth = Math.max(
        minRightWidth,
        Math.min(maxRightWidth, newRightWidth)
      );

      setRightWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, minLeftWidth, minRightWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = rightWidth;
  };

  return (
    <div ref={containerRef} className="resizable-layout">
      <div
        className="resizable-layout-left"
        style={{ flex: 1, minWidth: minLeftWidth }}
      >
        {left}
      </div>
      {!hideAI && (
        <>
          <div
            className={`resizable-layout-divider ${isDragging ? "dragging" : ""}`}
            onMouseDown={handleMouseDown}
          >
            <div className="divider-handle" />
          </div>

          {/* ai对话框 */}
          {collapsed ? (
            <div className="chat-collapsed">
              <button
                onClick={() => setCollapsed(false)}
                className="chat-collapse-button"
              >
                <MessageOutlined />
              </button>
            </div>
          ) : (
            <>
              {/* 关闭按钮 */}
              <button
                onClick={() => setCollapsed(true)}
                className="chat-close-button"
                style={{ right: rightWidth + 16 + "px" }}
              >
                <RightOutlined />
              </button>
              <div
                className="resizable-layout-right"
                style={{
                  width: `${rightWidth}px`,
                  minWidth: minRightWidth,
                  flexShrink: 0,
                }}
              >
                {right}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ResizableLayout;
