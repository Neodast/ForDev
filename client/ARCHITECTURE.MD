# STRUCTURE

## Layers structure

{app}--> {pages}--> {features}--> {modules}--> {entities}--> {components}--> {shared}

### app



## Segments structure

- **ui** *(folders with components and ui)*
- **api** *(folder with all api files, services, queries etc.)*
  - **queries**
  - **mutations**
  - **service**
- **model** *(folder with all business logic, types and interfaces)*
- **config** *(folder with configs etc.)*
- **lib** *(folder with all libraries like i18)*
- **utils** *(folder with all utils)*

## Example

/**models** *(layer)*
-/**user** *(slice)*
--/**ui** *(segment)*
---/Icon
----|**index.tsx** *(component)*
---/Label
---/Dropdown
---|**index.ts** *(public API | barrel file)*
--/api
--/model
---|user.interface.ts
--/config
--/utils
---/lib
---/constants
----|user.constant.ts
-/post
