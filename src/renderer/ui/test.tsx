import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faDatabase,
  faGear,
  faList,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faDocker } from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { themeChange } from 'theme-change';

interface SidebarItemProps {
  icon: IconDefinition;
  title: string;
  isPath: boolean;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  title,
  path,
  isPath,
  isActive,
  onClick,
}) => (
  <Tooltip title={isActive ? null : title} placement="right">
    <li onClick={onClick}>
      <a className={`h-8 flex justify-between ${isPath ? 'active' : ''}`}>
        <FontAwesomeIcon icon={icon} />
        {isActive && <a className="font-bold w-14"> {title}</a>}
      </a>
    </li>
  </Tooltip>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isExpanded) {
      timeoutId = setTimeout(() => setShouldShow(true), 180);
    } else {
      setShouldShow(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isExpanded]);

  const handleNavigate = useCallback(
    (path: string) => () => {
      navigate(path);
    },
    [navigate],
  );

  const items = [
    { icon: faHome, title: '主页', path: '/' },
    { icon: faDocker, title: '容器', path: '/docker' },
    { icon: faDatabase, title: '数据库', path: '/database' },
  ];

  const bottomItems = [
    { icon: faGear, title: '设置', path: '/setUp' },
    {
      icon: faList,
      title: '展开',
      path: '',
      onClick: () => setIsExpanded(!isExpanded),
    },
  ];

  return (
    <div
      className={` ${
        isExpanded
          ? 'w-32 transition-width duration-300 ease-in-out'
          : 'w-14 transition-width duration-500 ease-in-out'
      } flex flex-col justify-between h-full`}
    >
      <ul className="menu p-1 flex-grow">
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            title={item.title}
            path={item.path}
            isPath={location.pathname === item.path}
            isActive={shouldShow}
            onClick={handleNavigate(item.path)}
          />
        ))}
      </ul>
      <ul className="menu p-1">
        {bottomItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            title={item.title}
            path={item.path}
            isPath={location.pathname === item.path}
            isActive={shouldShow}
            onClick={item.onClick || handleNavigate(item.path)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
