import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Ui Library Impports
import { ActionIcon, useMantineTheme } from "@mantine/core";
import { notifications } from '@mantine/notifications';

// Local imports
import { IconFavorite, IconFavoriteFill } from '@/components/icon';
import { useAddArticleToFavoriteMutation, useRemoveArticleFromFavoriteMutation } from '@/store/slices/articles.api';
//---------------------------------------

const FavoriteButton = ({ article, size }) => {
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const [addArticleToFavorite, { isLoading: isAdding }] = useAddArticleToFavoriteMutation();
    const [removeArticleFromFavorite, { isLoading: isRemoving }] = useRemoveArticleFromFavoriteMutation();

    const onFavorite = () => {
        if (article.links.create_favorite) {
            addArticleToFavorite({ article })
                .then(() => {
                    notifications.show({
                        color: 'green',
                        title: t("writing.actions.addFavorite.success")
                    })
                })
                .catch((e) => {
                    console.log(e)
                    notifications.show({
                        color: 'red',
                        title: t("writing.actions.addFavorite.error")
                    });
                })
        } else if (article.links.remove_favorite) {
            removeArticleFromFavorite({ article })
                .then(() => {
                    notifications.show({
                        color: 'green',
                        title: t("writing.actions.removeFavorite.success")
                    })
                })
                .catch((e) => {
                    console.log(e)
                    notifications.show({
                        color: 'red',
                        title: t("writing.actions.removeFavorite.error")
                    });
                });
        }
    }
    let icon = null;

    if (article.links.remove_favorite) {
        icon = (<IconFavoriteFill height={size} style={{ color: theme.colors.red[9] }} />);
    }

    if (article.links.create_favorite) {
        icon = (<IconFavorite height={size} style={{ color: theme.colors.dark[3] }} />);
    }

    if (icon) {
        return (<ActionIcon variant="transparent" aria-label="favorite" onClick={onFavorite} loading={isAdding || isRemoving}>
            {icon}
        </ActionIcon>);
    }

    return null;
}

FavoriteButton.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number,
        links: PropTypes.shape({
            image: PropTypes.string,
            create_favorite: PropTypes.string,
            remove_favorite: PropTypes.string,
        }),
    }),
    size: PropTypes.any,
};


export default FavoriteButton;