import {
  Box,
  Collapse,
  Group,
  Navbar as MantineNavbar,
  rem,
  ThemeIcon,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import { useState } from 'react';

import { IconCalendarStats, IconChevronLeft, IconChevronRight, IconPresentationAnalytics, IconFileAnalytics } from '@tabler/icons-react';
import { IconGauge, IconNotes } from '@tabler/icons';
import Link from 'next/link';
import { UserButton } from './UserButton';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((item) => (
    <Link className={classes.link} href={item.link} key={item.label}>
      {item.label}
    </Link>
  ));

  return (
    <>
      {hasLinks ? (
        <>
          <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
            <Group position="apart" spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size="1.1rem" />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              {hasLinks && (
                <ChevronIcon
                  className={classes.chevron}
                  size="1rem"
                  stroke={1.5}
                  style={{
                    transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                  }}
                />
              )}
            </Group>
          </UnstyledButton>
          {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
      ) : (
        <Link style={{ textDecoration: 'none' }} href={link as string} passHref>
          <UnstyledButton className={classes.control}>
            <Group position="apart" spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size="1.1rem" />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
            </Group>
          </UnstyledButton>
        </Link>
      )}
    </>
  );
}

type NavbarProps = {
  opened: boolean;
};

const navLinks = [
  { label: 'Dashboard', icon: IconGauge, link: '/' },
  { label: 'Siswa', icon: IconNotes, link: '/student' },
  { label: 'Tahun Ajaran', icon: IconCalendarStats, link: '/'},
  { label: 'Mata Pelajaran', icon: IconPresentationAnalytics, link: '/'},
  { label: 'Nilai Siswa', icon: IconFileAnalytics , link: '/'},
  { label: 'Tahfizh',icon: IconCalendarStats, link: '/'},
];

export default function Navbar(props: NavbarProps) {
  const { classes } = useStyles();
  return (
    <MantineNavbar
      hidden={!props.opened}
      width={{ sm: 220, lg: 280 }}
      hiddenBreakpoint="sm"
      p="md"
      height="100vh"
      style={{ paddingTop: -70, paddingBottom: 70 }}
    >
      <MantineNavbar.Section grow>
        {navLinks.map((item) => (
          <LinksGroup {...item} />
        ))}
      </MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1482961674540-0b0e8363a005?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
