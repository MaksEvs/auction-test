import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@mui/material'
import {
  NotFoundActions,
  NotFoundCard,
  NotFoundCode,
  NotFoundDescription,
  NotFoundPageContainer,
  NotFoundTitle,
} from '@/pages/not-found/styles/not-found-page.styles'

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate({ to: '..' });
  };

  return (
    <NotFoundPageContainer>
      <NotFoundCard elevation={3}>
        <NotFoundCode variant="h1">
          404
        </NotFoundCode>

        <NotFoundTitle variant="h4">
          Страница не найдена
        </NotFoundTitle>

        <NotFoundDescription variant="body1">
          Возможно, ссылка устарела, страница была удалена или адрес введён
          неверно.
        </NotFoundDescription>

       <NotFoundActions>
          <Button
            variant="outlined"
            size="large"
            onClick={handleGoBack}
          >
            Вернуться назад
          </Button>

          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
          >
            На главную
          </Button>
        </NotFoundActions>
      </NotFoundCard>
    </NotFoundPageContainer>
  )
}