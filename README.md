# React Cards

**React Cards** — это обучающее веб-приложение, разработанное на базе React, предназначенное для изучения ключевых концепций и инструментов React через интерактивную работу с карточками вопросов и ответов.

## 📚 Описание

Проект охватывает как базовые, так и продвинутые темы. Карточки загружаются из локальной базы данных (`json-server`), доступны функции создания, редактирования, удаления, сортировки, фильтрации и пагинации. Реализованы темизация (светлая/тёмная тема), аутентификация и защищённые маршруты.

## ⚙️ Технологии

- **React 19**
- **Vite** — сборка и запуск
- **React Router** — маршрутизация
- **React Hooks** — `useState`, `useEffect`, `useContext`, `useMemo`, `useRef`, `useLayoutEffect`, `useActionState`
- **Кастомные хуки** — `useFetch`, `useAuth`, `useTheme`
- **React Toastify** — уведомления
- **json-server** — эмуляция REST API
- **ESLint + Prettier** — статический анализ и форматирование кода
- **CSS Modules** — модульная стилизация компонентов

## 📸 Screenshots

Main page
![Main page](public/screenshots/main-page-screenshot.png)

Card page
![Card page](public/screenshots/card-page-screenshot.png)

Edit card page
![Edit card page](public/screenshots/edit-card-page-screenshot.png)


## 🚀 Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone https://github.com/6dem/react-card-app.git
cd react-card-app
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Запустить сервер

```bash
npm run server
```

### 4. Запустить приложение

```bash
npm run dev
```
