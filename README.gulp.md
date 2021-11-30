# Gulp сборка

## Команды

#### gulp

#### gulp build

#### gulp cleanBuild

#### gulp prod

#### gulp cleanPublic

#### gulp images

#### gulp sprite

#### gulp fonts

## Задачи:

**оптимизация шрифтов**

gulp fonts

- берет шрифты ttf из /src/fontsTTF
- преобразует в шрифты woff/woff2
- выгружает шрифты woff/woff2 в /src/fonts/

**оптимизация изображений**

gulp images

- берет изображения из /src/imgNotOptimized/
- сжимает изображения преобразует jpg в webp
- выгружает оптимизированные изображения в /src/img/

**создание svg-спрайт**

gulp sprite

- берет отдельные svg из /src/svg/sprite/
- создает svg-спрайт выгружает svg-спрайт в /src/svg/

**очистка сборки**

gulp cleanBuild

- очищает devFolder

gulp cleanPublic

- очищает publicFolder

---

## Сборка:

### developers

#### gulp

- берет исходники из sourcesFolder
- очищает devFolder
- выгружает сборку в devFolder
- следит за изменениями файлов
- вызывает browser-sync из devFolder

#### gulp build

- выполняет сборку
- **НЕ вызывает browser-sync**

**html**

gulp-file-include

- объединяет html
- выгружает html-файлы в devFolder

**scss**

gulp-sass

- объединяет scss

  gulp-group-css-media-queries

- группирует медиа-запросы

  gulp-autoprefixer

- добавляет вендорные префиксы

  gulp-clean-css

- сжимает и оптимизирует css

- выгружает devFolder два файла:
  _.css
  _.min.css

**js**

gulp-concat

- объединяет все js-файлы из /src/template/ в единый файл 'template.js'
- объединяет все js-файлы из /src/js/modules/ в единый файл 'modules.js'
- объединяет modules.js и template.js и main.js из /src/js/ в единый файл 'app.js'
- объединяет все js-файлы из /src/libs/ в единый файл 'libs.js'

  gulp-babel

- обрабатывает все js-файлы из /src/js/

  gulp-uglify-es

- сжимает и оптимизирует js

- выгружает в devFolder три файла:
  libs.js
  app.js
  app.min.js

**fonts**

- выгружает шрифты из /src/fonts/ в /build/fonts/

**img**

- выгружает изображения из /src/img/ в /build/img/

**svg**

- выгружает svg из /src/svg/ в /build/svg/

---

### Готовый проект

#### gulp prod

- берет исходники из devFolder
- очищает publicFolder
- выгружает сборку в publicFolder
- вызывает browser-sync из publicFolder
