import React from 'react';

import Link from 'next/link';

import { useSelector } from 'react-redux';

import { RootState } from '../../redux';

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';

import {
  MoreVert,
  Checkroom,
  SportsEsports,
  DirectionsBike,
  AdminPanelSettings,
  Add,
  Clear,
  ChatBubbleOutline,
  Person,
  ManageAccounts,
} from '@mui/icons-material';

const catalogMenu = ({
  toggleDrawer,
  setIsOpenCatalogMenu,
  isOpenCatalogMenu,
  role,
}: any) => (
  <>
    <Box
      role="presentation"
      onKeyDown={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
      sx={{ minWidth: '170px' }}
    >
      <List>
        <ListItem>
          <Person />
          <ListItemText primary={'Common'} sx={{ marginLeft: '5px' }} />
        </ListItem>
        <Divider style={{ backgroundColor: 'rgba(0,0,0,0.08' }} />
        {[
          { href: 'clothes/1', name: 'Clothes', icon: <Checkroom /> },
          { href: 'games/1', name: 'Games', icon: <SportsEsports /> },
          {
            href: 'bicycles/1',
            name: 'Bicycles',
            icon: <DirectionsBike />,
          },
        ].map((el: any, index) => (
          <Link href={`/catalog/${el.href}`} passHref key={index}>
            <ListItem
              button
              onClick={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
            >
              {el.icon}
              <ListItemText primary={el.name} sx={{ marginLeft: '5px' }} />
            </ListItem>
          </Link>
        ))}
      </List>
      {(role === 'user' || role === 'admin') && (
        <>
          <Divider style={{ backgroundColor: 'rgba(0,0,0,0.4' }} />
          <List>
            <ListItem>
              <ManageAccounts />
              <ListItemText
                primary={'User`s rooms'}
                sx={{ marginLeft: '5px' }}
              />
            </ListItem>
            <Divider style={{ backgroundColor: 'rgba(0,0,0,0.08' }} />
            <Link href={'/rooms'} passHref>
              <ListItem
                button
                onClick={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
              >
                <ChatBubbleOutline />
                <ListItemText primary={'Rooms'} sx={{ marginLeft: '5px' }} />
              </ListItem>
            </Link>
          </List>
        </>
      )}
      {role === 'admin' && (
        <>
          <Divider style={{ backgroundColor: 'rgba(0,0,0,0.4' }} />
          <List>
            <ListItem>
              <AdminPanelSettings />
              <ListItemText
                primary={'Admin Panel'}
                sx={{ marginLeft: '5px' }}
              />
            </ListItem>
            <Divider style={{ backgroundColor: 'rgba(0,0,0,0.08' }} />
            <Link href={`/admin/${'create-good'}`} passHref>
              <ListItem
                button
                onClick={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
              >
                <Add />
                <ListItemText
                  primary={'Create good'}
                  sx={{ marginLeft: '5px' }}
                />
              </ListItem>
            </Link>
            <Link href={`/admin/${'delete-good'}`} passHref>
              <ListItem
                button
                onClick={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
              >
                <Clear />
                <ListItemText
                  primary={'Delete good'}
                  sx={{ marginLeft: '5px' }}
                />
              </ListItem>
            </Link>
          </List>
        </>
      )}
    </Box>
  </>
);

const Catalog = ({ toggleDrawer }: any) => {
  const [isOpenCatalogMenu, setIsOpenCatalogMenu] = React.useState(false);

  const role = useSelector((state: RootState) => state.authSlice.role);

  return (
    <>
      <IconButton
        style={{ color: 'inherit' }}
        onClick={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
      >
        <MoreVert />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpenCatalogMenu}
        onClose={toggleDrawer(setIsOpenCatalogMenu, isOpenCatalogMenu)}
      >
        {catalogMenu({
          toggleDrawer,
          setIsOpenCatalogMenu,
          isOpenCatalogMenu,
          role,
        })}
      </Drawer>
    </>
  );
};

export default React.memo(Catalog);
