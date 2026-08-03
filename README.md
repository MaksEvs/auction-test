# Cargo Auctions

SPA для работы с грузовыми аукционами: список и фильтрация аукционов,
детальная информация, история ставок и создание или изменение своей ставки.

Backend эмулируется через MSW. Mock store изменяется после успешной ставки,
поэтому список, детали и история обновляются без перезагрузки страницы.

## Стек

- React, TypeScript, Vite;
- TanStack Router и TanStack Query;
- React Hook Form + Zod;
- MSW;
- Zustand для notification UI-state;
- MUI;
- Feature-Sliced Design;
- Vitest + React Testing Library.

## Запуск

Требуется Node.js 20+.

```bash
npm ci
npm run dev
```

Основные команды:

```bash
npm test           # тесты
npm run test:watch # тесты в watch mode
npm run lint       # ESLint
npm run build      # TypeScript + production build
npm run preview    # просмотр production build
```

## Маршруты

| Маршрут | Назначение |
| --- | --- |
| `/` | Список, фильтры и пагинация |
| `/auctions/$auctionUuid` | Детальная страница |
| `/auctions/$auctionUuid/bets` | История ставок |
| `/auctions/$auctionUuid/bet` | Создание или изменение ставки |

Неизвестный frontend-маршрут или UUID несуществующего аукциона показывает
адаптивную 404-страницу.

## Реализовано

- загрузка списка через TanStack Query;
- pagination, skeleton, empty и error states;
- prefetch деталей по hover и keyboard focus;
- обязательные фильтры с синхронизацией в URL;
- Zod-валидация search params с безопасными fallback-значениями;
- адаптивные страницы списка, деталей, ставок и формы;
- отображение всех точек маршрута, груза, требований к ТС, оплаты и торгов;
- visible, hidden и empty состояния истории ставок;
- React Hook Form + Zod validation ставки;
- проверка `can_set_bet`, `price > 0`, min, max и направления Up/Down;
- обработка `422 ValidationFailed` у поля цены;
- success/error notification через Zustand;
- invalidation list/detail/bets query после mutation;
- обновление текущей цены, статуса пользователя и ставок в MSW store.

## Особенность карточки аукциона

ТЗ требует показывать числовой шаг ставки в карточке списка. При этом
`AuctionListItemTradingPrice` в переданной OpenAPI-схеме содержит только
`start`, `current` и `current_no_vat`; поле `step` присутствует только в detail DTO.

Да я понимаю что это вероятней всего ошибка в схеме и в реальном бэке такого бы небыло
Но я использую формулировку Схема API передаётся кандидату как источник правды
Потому вместо шага "см детали"

`openapi.auctions.v0.json`.** Поэтому list response не был расширен полем,
которого нет в контракте, и для каждой карточки не выполняется дополнительный
detail request. В карточке выводится «см. детали», а реальный шаг показывается на
детальной странице и в форме ставки.

Если ставка недоступна, primary action карточки — «Смотреть ставки» и ведёт в
историю аукциона. При скрытой истории страница показывает соответствующее
ограничение организатора.

## Проверка

Автоматически проверены:

- parsing и fallback URL search params;
- search params → API request;
- Zod-схема и request mapper ставки;
- форматирование nullable-значений;
- расчёт доступной цены и price boundaries;
- authoritative MSW validation;
- client validation, success и server 422 в форме ставки.

Текущий результат:

```text
Test Files  7 passed
Tests       53 passed
ESLint      passed
Build       passed
```

Для ручной проверки рекомендуется пройти фильтры и восстановление URL,
детали с открытыми/скрытыми данными, visible/hidden/empty историю ставок,
создание и изменение ставки, 422, прямые ссылки, 404 и mobile layout.

## Известные ограничения

- Числовой `step` отсутствует в list DTO и показывается только там, где он есть
  по OpenAPI-контракту.
- Для `401`, `503` и network errors используется общий error state; отдельные
  демонстрационные MSW-сценарии можно добавить при дальнейшем развитии.
- Production bundle собирается одним chunk; Vite предупреждает о размере больше
  500 KB. Следующий performance-шаг — route-level code splitting.

Отчёт об использовании AI находится в `AI_USAGE.md`.
