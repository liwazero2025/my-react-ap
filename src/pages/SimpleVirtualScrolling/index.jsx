import { useState, useEffect, useRef } from 'react';

/**
 * 手动实现虚拟滚动组件（固定高度列表）
 * @param {Array} data - 列表数据
 * @param {number} itemHeight - 每个列表项的固定高度（px）
 * @param {React.ComponentType} renderItem - 列表项渲染函数
 */
const VirtualList = ({ data, itemHeight = 50, renderItem }) => {
  // 容器 Ref
  const containerRef = useRef(null);
  // 可视区域高度（默认窗口高度）
  const [containerHeight, setContainerHeight] = useState(500);
  // 滚动偏移量
  const [scrollTop, setScrollTop] = useState(0);

  // 1. 计算核心参数
  // 可视区域能显示的列表项数量
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  // 缓冲数量（上下各加 5 个，避免滚动时空白）
  const bufferCount = 5;
  // 起始索引（可视区域第一个项的索引）
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferCount);
  // 结束索引（可视区域最后一个项的索引）
  const endIndex = Math.min(
    data.length - 1,
    startIndex + visibleCount + 2 * bufferCount
  );
  // 可视区域内的列表项
  const visibleData = data.slice(startIndex, endIndex + 1);
  // 列表总高度（用于撑开滚动条）
  const totalHeight = data.length * itemHeight;
  // 可视区域内项的偏移量（让项显示在正确位置）
  const offsetTop = startIndex * itemHeight;

  // 2. 初始化容器高度
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
      // 监听容器大小变化（可选）
      const observer = new ResizeObserver(() => {
        setContainerHeight(containerRef.current.clientHeight);
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  // 3. 监听滚动事件
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #eee'
      }}
      onScroll={handleScroll}
    >
      {/* 撑开滚动条的占位容器 */}
      <div style={{ height: `${totalHeight}px`, pointerEvents: 'none' }} />
      {/* 可视区域内的列表项（绝对定位） */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${offsetTop}px)`
        }}
      >
        {visibleData.map((item, index) =>
          renderItem(item, startIndex + index)
        )}
      </div>
    </div>
  );
};

// ========== 业务中使用 ==========
const  SimpleVirtualScrolling = () => {
  // 生成 1 万条测试数据
  const [data] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `列表项 ${i + 1}` }))
  );

  // 列表项渲染函数
  const renderItem = (item, index) => (
    <div
      key={item.id}
      style={{
        height: `${50}px`,
        lineHeight: '50px',
        borderBottom: '1px solid #f5f5f5',
        padding: '0 16px'
      }}
    >
      {item.name}
    </div>
  );

  return (
    <div style={{ height: '100vh', width: '100vw', margin: '0 auto' }}>
      <h3>React 手动实现虚拟滚动（1 万条数据）</h3>
      <VirtualList
        data={data}
        itemHeight={50}
        renderItem={renderItem}
      />
    </div>
  );
}

export default SimpleVirtualScrolling;