import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

//-----------------------------------

const Profile = () => {
    const {t} = useTranslation();

    return (<>
    <Button variant="default">{t('login.title')}</Button>
    <Button>{t('register.title')}</Button></>)
};

export default Profile;