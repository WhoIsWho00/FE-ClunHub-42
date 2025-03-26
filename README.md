# FE-ClunHub-Cohort53


Введение

Описание проекта:

"Семейный планер" — это приложение для организации семейных дел и задач с
элементами геймификации. Пользователи могут создавать, назначать и отслеживать
выполнение задач, получать баллы за активность, комментировать задачи, управлять
семейными настройками и обменивать накопленные баллы на награды.

Цель проекта:

Основные цели:

● Обеспечение удобного интерфейса для планирования семейных задач.
● Внедрение системы геймификации для мотивации пользователей.
● Разработка функционала семейных настроек, позволяющего управлять
   правами участников.
● Создание мобильного адаптивного приложения с удобной навигацией.


Задачи:

● Реализовать систему регистрации и авторизации (Google, Apple ID, email)
● Разработать функционал создания, редактирования и отображения профилей.
● Внедрить систему создания, редактирования, переноса и выполнения задач.
● Разработать механизм комментариев и уведомлений.
● Внедрить календарь задач с фильтрацией и сортировкой.
● Реализовать систему начисления баллов и рейтинг участников.
● Разработать "магазин наград" для обмена баллов на поощрения.


Функциональные требования:

Регистрация и авторизация:
● Вход через Google, Apple ID или email.
● Восстановление пароля через email.

Профиль пользователя:

● Выбор аватара (загрузка фото или выбор из предложенных иконок).
● Поля: имя, дата рождения, роль (мама, папа, ребенок и т. д.).
● Отображение профиля на главном экране.
● Возможность редактирования профиля.

Создание и управление задачами:

● Администратор может создавать задачи для всех участников.
● Обычный пользователь может добавлять задачи только для себя.
● Возможность отметить задачу как выполненную.
● Отображение статуса задачи (активна, выполнена, просрочена).
● Перенос задачи на другой день.

Комментарии:

● Возможность комментировать задачи.
● Удаление и редактирование своих комментариев.

Календарь:

● Отображение задач в календаре.
● Фильтрация задач по дням, неделям, месяцам.
● Фильтр по статусу задач (все/только нерешенные).

Геймификация:

● +10 звезд за выполненную задачу.
● +25 звезд за выполнение всех задач за день.
● +50 звезд за выполнение всех задач за неделю.
● Лидерборд (список лучших участников).

 Магазин наград:
 
● Каталог подарков.
● Возможность обмена звезд на подарки.

Настройки семьи:

● Администратор может управлять участниками и их правами.
● Настройка видимости задач.


 Уведомления:
 
● Напоминание о задачах за 30 минут до дедлайна.
● Уведомление о новых задачах.

Нефункциональные требования

Производительность:

● Время отклика основных операций не более 3 секунд.

Безопасность:

● Шифрование данных пользователей.
● Защита от SQL-инъекций и XSS-атак.

Масштабируемость:

● Возможность расширения функционала.

Надежность:

● Регулярное резервное копирование.

Юзабилити:

● Интуитивно понятный интерфейс.
● Адаптивный дизайн.

 Технологии и архитектура
 
Backend:

● Разработка RESTful API (Spring Boot).

Frontend:

● React + Vite.

База данных:

● PostgreSQL или MongoDB (в зависимости от требований).

Интеграции:

● Авторизация через Google, Apple ID.
● Уведомления.

Процесс разработки и тестирования

 Планирование
 
● Составление списка задач и проектирование архитектуры.

 Этапы разработки (месячный спринт)
 
Неделя 1:

● Анализ требований.
● Разработка архитектуры.
● Подготовка прототипов.

Неделя 2:

● Реализация авторизации.
● Создание профилей пользователей.
● Разработка системы задач.

Неделя 3:

● Реализация календар
● Внедрение комментариев.
● Добавление системы геймификации.

Неделя 4:

● Интеграция всех модулей.
● Тестирование.
● Исправление ошибок.

 Тестирование
 
● Автоматизированное и ручное тестирование.
● Проверка безопасности и производительности.
● Регрессионное тестирование.

Документация и поддержка

Техническая документация:

● API-документация.
● Архитектурные схемы.

Пользовательская документация:

● Руководство пользователя.
● FAQ.

Документация по тестированию:

● Тест-планы.
● Баг-репорты.

Критерии успешного завершения проекта

● Реализация всех ключевых функциональных требований.
● Успешное тестирование без критических ошибок.
● Готовность приложения к использованию и масштабированию.

