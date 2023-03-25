import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Table, ScrollArea, Menu, Drawer, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { IconTrash, IconPencil, IconSend, IconDeviceFloppy } from '@tabler/icons-react';
import Search from '@/features/student/components/Search';
import EditUserForm, { Profile } from '@/features/student/components/EditUser';
import DeleteModal from '@/features/student/components/DeleteModal';
import DashboardLayout from '@/components/DashboardLayout';
import { TableActionMenu } from '@/features/student/components/TableActionMenu';

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
  const theme = useMantineTheme();

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
            <TableActionMenu>
              <Menu.Label>{user.name}</Menu.Label>
              <Menu.Item
                icon={<IconPencil size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
                onClick={() => {
                  setSelectedProfileData(user);
                  toggleDrawer(true);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<IconSend size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
                onClick={() => sendMessage()}
              >
                Kirim Pesan
              </Menu.Item>

              <Menu.Item
                icon={<IconDeviceFloppy size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
                onClick={() => copyProfile()}
              >
                Simpan
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size="0.9rem" stroke={1.5} color={theme.colors.red[6]} />}
                onClick={() => deleteProfile()}
                color="red"
              >
                Hapus
              </Menu.Item>
            </TableActionMenu>
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
