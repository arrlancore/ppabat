import { Menu, Group, Text, Avatar, useMantineTheme, ActionIcon } from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronRight,
  IconDots,
  IconPencil,
} from '@tabler/icons-react';

export function TableActionMenu(props: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <Menu
        withArrow
        width={150}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon>
            <IconDots size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {props.children}

        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
