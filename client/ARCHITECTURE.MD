# STRUCTURE

## Layers structure

{**app**}--> {**pages**}--> {**features**}--> {**modules**}--> {**entities**}--> {**components**}--> {**shared**}

### app

## Segments structure

- **ui** *(folders with components and ui)*
- **api** *(folder with all api files, services, queries etc.)*
- **model** *(folder with all types(dtos, types, entities, etc.) , interfaces, enums)*
- **config** *(folder with configs, constants etc.)*
- **hooks** *(folder with hooks)*
- **helpers** *(folder with helpers)*
- **lib** *(folder with all libraries staff like i18 and tailwind)*
- **utils** *(folder with all utils things)*

> *folder structure can be changed*

## Example

>/**features** *(layer)*
>--/**user** *(module)*
>----/**ui** *(segment)*
>------/Icon
>--------|**index.tsx** *(component)*
>--------|**index.styles.scss** *(style)*
>------/Label
>------/Dropdown
>------|**index.ts** *(public API | barrel file | index file)*
>----/api
>----/model
>----/constants
>------|user.constant.ts
>------|index.ts
>----/interfaces
>------|user.interface.ts
>------|index.ts
>----|index.ts
>----/config
>----/utils
>----/lib
>--/post
