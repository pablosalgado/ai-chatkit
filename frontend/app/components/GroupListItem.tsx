import React from 'react';
import { Dropdown, Menu as AntMenu, Button } from 'antd';
import { EllipsisOutlined, TeamOutlined } from '@ant-design/icons';

interface GroupListItemProps {
  group: { key: string; label: string };
  onDelete: (key: string) => void;
}

const GroupListItem: React.FC<GroupListItemProps> = ({ group, onDelete }) => {
  return (
    <div className="flex items-center gap-2 w-full min-w-0 flex-1 overflow-visible">
      <TeamOutlined className="shrink-0" />
      <span className="flex-1 overflow-hidden text-clip whitespace-nowrap min-w-0">
        {group.label}
      </span>
      <Dropdown
        className="shrink-0 w-6 ml-2 flex-none"
        overlay={
          <AntMenu>
            <AntMenu.Item key="delete" onClick={() => onDelete(group.key)}>
              DELETE
            </AntMenu.Item>
          </AntMenu>
        }
        trigger={["click"]}
      >
        <Button
          icon={<EllipsisOutlined />}
          shape="circle"
          size="small"
          style={{ flexShrink: 0, backgroundColor: "transparent", color: "#fff" }}
        />
      </Dropdown>
    </div>
  );
};

export default GroupListItem;

