import React from 'react';
import { Layout, Menu, Collapse, Button } from 'antd';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import NewChatButton from './NewChatButton';
import { useLayoutContext } from '../layout-context'


interface SiderComponentProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  sessions: Array<{ threadId: string; name: string; lastUpdated: number }>;
  handleDeleteSession: (threadId: string) => void;
  handlerNewChat: () => void;
  items: Array<{ key: string; label: React.ReactNode }>;
  onSelectSession: (key: string) => void;
}

const { Sider } = Layout;

const SiderComponent: React.FC<SiderComponentProps> = ({ 
  collapsed, 
  onCollapse, 
  sessions, 
  handleDeleteSession, 
  handlerNewChat, 
  items,
  onSelectSession
}) => {
  const { currentThreadId, setCurrentThreadId } = useLayoutContext()

  // Mock group data for placeholder
  const mockGroups = [
    { key: 'group-1', label: 'Marketing Team' },
    { key: 'group-2', label: 'Engineering Team' },
    { key: 'group-3', label: 'Product Team' },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={200}
    >
      {!collapsed && (
        <div className="logo flex items-center justify-center h-16 text-white text-lg">
          AI-CHATKIT
        </div>
      )}
      {!collapsed && (
        <div className="px-2 py-2">
          <Collapse
            defaultActiveKey={['groups', 'chats']}
            bordered={false}
            className="bg-transparent"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
            expandIconPosition="end"
            items={[
              {
                key: 'groups',
                label: <span className="text-white font-medium">Groups</span>,
                children: (
                  <div className="pt-2">
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      className="w-full mb-3"
                      style={{ backgroundColor: '#1890ff', marginLeft: 0, marginRight: 0 }}
                    >
                      New Group
                    </Button>
                    <Menu
                      theme="dark"
                      mode="inline"
                      selectable={false}
                      className="border-0"
                      style={{ backgroundColor: 'transparent' }}
                      items={mockGroups.map(group => ({
                        key: group.key,
                        icon: <TeamOutlined />,
                        label: group.label,
                      }))}
                    />
                  </div>
                ),
                style: {
                  marginBottom: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              },
              {
                key: 'chats',
                label: <span className="text-white font-medium">Chats</span>,
                children: (
                  <div className="pt-2">
                    <div style={{ marginTop: '-8px', marginBottom: '8px' }}>
                      <NewChatButton collapsed={false} onClick={handlerNewChat} />
                    </div>
                    <Menu
                      theme="dark"
                      className="max-h-[calc(100vh-400px)] overflow-y-auto border-0"
                      style={{ backgroundColor: 'transparent' }}
                      defaultSelectedKeys={[currentThreadId]}
                      selectedKeys={[currentThreadId]}
                      mode="inline"
                      items={items}
                      onSelect={({ key }) => {
                        onSelectSession(key);
                      }}
                    />
                  </div>
                ),
                style: {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              },
            ]}
          />
        </div>
      )}
    </Sider>
  );
};

export default SiderComponent;