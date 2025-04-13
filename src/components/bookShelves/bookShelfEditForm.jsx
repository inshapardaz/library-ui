import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// UI library import
import { Group, Button, Drawer, Box, TextInput, Textarea, Switch, Space, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useForm, isNotEmpty } from "@mantine/form";

// Local Import
import {
    useAddBookShelfMutation,
    useUpdateBookShelfMutation,
} from "/src/store/slices/bookShelves.api";
import { error, success } from '@/utils/notifications';

// --------------------------------------
const BookShelfEditForm = ({ libraryId, bookShelf = null, children }) => {
    const { t } = useTranslation();
    const [opened, { open, close }] = useDisclosure(false);
    const [loaded, setLoaded] = useState(false);

    const [addBookShelf, { isLoading: isAdding }] = useAddBookShelfMutation();
    const [updateBookShelf, { isLoading: isUpdating }] =
        useUpdateBookShelfMutation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            description: '',
            isPublic: false
        },

        validate: {
            name: isNotEmpty(t("bookShelf.name.required")),
        },
    });

    useEffect(() => {
        if (!loaded && bookShelf != null) {
            form.initialize(bookShelf);
            setLoaded(true);
        }
    }, [bookShelf, form, loaded]);


    const onSubmit = (values) => {
        if (bookShelf) {
            const payload = {
                name: values.name,
                description: values.description,
                isPublic: values.isPublic,
            };
            return updateBookShelf({ libraryId, bookshelfId: bookShelf.id, payload })
                .unwrap()
                .then(() => success({ message: t("bookShelf.actions.edit.success") }))
                .then(() => close())
                .catch(() => error({ message: t("bookShelf.actions.edit.error") }));
        } else {
            return addBookShelf({ libraryId, payload: values })
                .unwrap()
                .then(() => success({ message: t("bookShelf.actions.add.success") }))
                .then(() => close())
                .catch(() => error({ message: t("bookShelf.actions.add.error") }));
        }
    }

    const title = bookShelf ? t('bookShelf.actions.edit.title', { name: bookShelf.name }) : t('bookShelf.actions.add.title')

    return (<>
        <Drawer opened={opened} onClose={close} title={title} position='right'>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput key={form.key('name')}
                    label={t("bookShelf.name.label")}
                    placeholder={t("bookShelf.name.placeholder")}
                    {...form.getInputProps('name')}
                />

                <Textarea key={form.key('description')}
                    label={t("bookShelf.description.label")}
                    {...form.getInputProps('description')} />
                <Space h="md" />
                <Group>
                    <Switch
                        label={t("bookShelf.isPublic.label")}
                        key={form.key('isPublic')}
                        {...form.getInputProps('isPublic', { type: 'checkbox' })}
                    />
                    <Text>
                        {t('bookShelf.isPublic.helpText')}
                    </Text>
                </Group>

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={isAdding || isUpdating}>{t('actions.save')}</Button>
                    <Button variant='light' onClick={close}>{t('actions.cancel')}</Button>
                </Group>
            </form>
        </Drawer>
        <Box onClick={open}>
            {children}
        </Box>
    </>
    );
};


BookShelfEditForm.propTypes = {
    libraryId: PropTypes.any,
    children: PropTypes.any,
    bookShelf: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        isPublic: PropTypes.bool,
    })
};

export default BookShelfEditForm;