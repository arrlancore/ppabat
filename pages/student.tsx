import Head from 'next/head';
import { useState, useEffect } from 'react';
import {
  Table,
  ScrollArea,
  Menu,
  Divider,
  Drawer,
  Text,
  Button,
  Group,
  Avatar,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { Edit2, Send, Save, Trash2, MoreHorizontal } from 'react-feather';

import Search from '@/features/student/components/Search';
import EditUserForm, { Profile } from '@/features/student/components/EditUser';
import DeleteModal from '@/features/student/components/DeleteModal';
import DashboardLayout from '@/components/DashboardLayout';
// import SendMessageForm from '@/features/student/components/SendMessage';

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
} from '@tabler/icons-react';

export function UserMenu() {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <Menu
        withArrow
        width={300}
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
          <Menu.Item rightSection={<IconChevronRight size="0.9rem" stroke={1.5} />}>
            <Group>
              <Avatar
                radius="xl"
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              />

              <div>
                <Text weight={500}>Nancy Eggshacker</Text>
                <Text size="xs" color="dimmed">
                  neggshaker@mantine.dev
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item icon={<IconHeart size="0.9rem" stroke={1.5} color={theme.colors.red[6]} />}>
            Liked posts
          </Menu.Item>
          <Menu.Item icon={<IconStar size="0.9rem" stroke={1.5} color={theme.colors.yellow[6]} />}>
            Saved posts
          </Menu.Item>
          <Menu.Item icon={<IconMessage size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}>
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
            Pause subscription
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

const MOCKUP_USERS = [
  {
    name: 'John Doe',
    email: 'john@doe.com',
    address: 'Mankato Mississippi 96522, Nulla st. 10',
    workplace: 'Samsung',
    phone: '(257) 563-7401',
  },
  {
    name: 'Cecilia Chapman',
    email: 'Cecilia@doe.com',
    address: 'Tamuning PA 10855, Sodales Av. 4264',
    workplace: 'Apple',
    phone: '(786) 713-8616',
  },
  {
    name: 'Kyla Olsen',
    email: 'Kyla@doe.com',
    address: 'Chelsea MI 67708, Nunc Road 4',
    workplace: 'Microsoft',
    phone: '(947) 278-5929',
  },
  {
    name: 'Nyssa Vazquez',
    email: 'Nyssa@doe.com',
    address: 'Latrobe DE 38100, Viverra. Avenue',
    workplace: 'Google',
    phone: '(608) 265-2215',
  },
  {
    name: 'Aaron Hawkins',
    email: 'Aaron@doe.com',
    address: 'Santa Rosa MN 98804, Tortor. Street 42',
    workplace: 'Facebook',
    phone: '(959) 119-8364',
  },
];

export default function Users(/*props*/) {
  // const modals = useModals();

  const [users, setUsers] = useState(MOCKUP_USERS); // props.users
  const [tableRows, setTableRows] = useState<Array<any>>([]);
  const [drawerOpened, toggleDrawer] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState<Profile>();
  const [searchLoading, setSearchLoading] = useState(false);
  const [openedDeleteModal, disclosureDeleteModal] = useDisclosure(false);

  const onSearch = (textSearch: string) => {
    setSearchLoading(true);

    const search = textSearch.toLowerCase().trim();

    if (!search) {
      setUsers(MOCKUP_USERS); // props.users
      setSearchLoading(false);
      return;
    }

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.address.toLowerCase().includes(search) ||
        user.workplace.toLowerCase().includes(search) ||
        user.phone.includes(search)
    );

    setUsers(filteredUsers);

    setSearchLoading(false);
  };

  const cancelSearch = () => {
    setUsers(MOCKUP_USERS); // props.users
  };

  const onSubmitEditForm = (oldUser: Profile, newUser: Profile) => {
    toggleDrawer(false);

    // edit data in db

    let tmpUsers = users;
    tmpUsers.splice(tmpUsers.indexOf(oldUser), 0, newUser);
    tmpUsers = tmpUsers.filter((u) => u !== oldUser);
    setUsers(tmpUsers);

    notifications.show({
      title: 'Profil szerkesztése',
      message: `${newUser.name} profilját sikeresen szerkesztette`,
      color: 'teal',
    });
  };

  const sendMessage = () => {
    // const modal = modals.openModal({
    //   title: 'Üzenetküldés',
    //   children: <SendMessageForm />,
    //   centered: true,
    // });
  };

  const copyProfile = () => {
    notifications.show({
      title: 'Profil másolása',
      message: 'profilja JSON formátumban sikeresen vágólapra lett helyezve',
      color: 'teal',
    });
  };

  const onDeleteProfile = () => {
    notifications.show({
      title: 'Delete Profil',
      message: 'Profile telah dihapus',
      color: 'red',
    });
  };

  const deleteProfile = () => {
    disclosureDeleteModal.open();
  };

  useEffect(() => {
    setTableRows(
      users.map((user: Profile, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>{user.workplace}</td>
          <td>{user.phone}</td>
          <td>
            <UserMenu />
            {/* <Menu>
              <Menu.Target>
                <Button variant="subtle">
                  <MoreHorizontal />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user.name}</Menu.Label>
                <Menu.Item
                  icon={<Edit2 />}
                  onClick={() => {
                    setSelectedProfileData(user);
                    toggleDrawer(true);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item icon={<Send />} onClick={() => sendMessage()}>
                  Kirim Pesan
                </Menu.Item>
                <Divider />
                <Menu.Item icon={<Save />} onClick={() => copyProfile()}>
                  Simpan
                </Menu.Item>
                <Menu.Item icon={<Trash2 />} onClick={() => deleteProfile()} color="red">
                  Hapus
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </td>
        </tr>
      ))
    );
  }, [users]);

  return (
    <DashboardLayout>
      <Head>
        <title>Student | Nextine</title>
        <meta name="description" content="A Nextine oldal felhasználókat kezelő oldala." />
      </Head>

      <Text weight="bold" mb="xs" style={{ fontSize: 32 }}>
        Data Siswa
      </Text>

      <DeleteModal
        opened={openedDeleteModal}
        close={disclosureDeleteModal.close}
        onDelete={onDeleteProfile}
      />

      <Drawer
        opened={drawerOpened}
        onClose={() => toggleDrawer(false)}
        title="Felhasználó módosítása"
        padding="xl"
        size="xl"
      >
        <EditUserForm data={selectedProfileData} submitForm={onSubmitEditForm} />
      </Drawer>

      <Search loading={searchLoading} onSubmit={onSearch} onCancel={cancelSearch} />

      {tableRows.length > 0 ? (
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Address</th>
                <th>Workplace</th>
                <th>Phone</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </ScrollArea>
      ) : (
        <Text align="center" weight="bold">
          Tidak ada data!
        </Text>
      )}
    </DashboardLayout>
  );
}
