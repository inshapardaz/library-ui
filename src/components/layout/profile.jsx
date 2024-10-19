import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Ui Library Imports
import cx from 'clsx';
import { Avatar, Button, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { modals } from '@mantine/modals';

// Local Imports
import { logout, loggedInUser, isLoggedIn } from "@/store/slices/authSlice";
import classes from './profile.module.css';
import { IconLogout, IconSettings, IconSwitchHorizontal, IconChevronDown } from "../icon";
//-----------------------------------

const Profile = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserLoggedIn = useSelector(isLoggedIn);
    const user = useSelector(loggedInUser)
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const logoutClicked = () => modals.openConfirmModal({
        title: t('logout.title'),
        children: (
            <Text size="sm">
                {t('logout.confirmation')}
            </Text>
        ),
        labels: { confirm: t('actions.yes'), cancel: t('actions.no') },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            dispatch(logout())
            navigate('/')
        },
    });

    if (isUserLoggedIn) {
        return (<>
            <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
            >
                <Menu.Target>
                    <UnstyledButton
                        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                    >
                        <Group gap={7}>
                            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                            <Text fw={500} size="sm" lh={1} mr={3}>
                                {user.name}
                            </Text>
                            <IconChevronDown
                                size={12}
                                stroke={1.5}
                            />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Divider />
                    <Menu.Item
                        leftSection={
                            <IconSettings size={16} stroke={1.5} />
                        }
                    >
                        {t('profile.title')}
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconSwitchHorizontal size={16} stroke={1.5} />
                        }
                        component={Link}
                        to='/change-password'
                    >
                        {t('changePassword.title')}
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={logoutClicked}
                        leftSection={
                            <IconLogout size={16} stroke={1.5} />
                        }
                    >
                        {t('logout.title')}
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>)
    }
    return (<>
        <Button variant="default"
            component={Link}
            to="/account/login">
            {t('login.title')}</Button>
        <Button
            component={Link}
            to="/account/register">
            {t('register.title')}
        </Button></>)
};

export default Profile;