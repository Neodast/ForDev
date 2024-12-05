# STRUCTURE

## Layers structure

app--> pages--> features--> modules--> components--> shared

## Slices structure

- ui (folders with components)
- api (folder with all api files, services, queries)
- model (folder with all misc folders like hooks or helpers or types)
- config (folder with constants, configs etc.)
- lib (folder with all libraries like i18)

## Example

/models
-/user
--/ui
---/Icon
---/Label
---/Dropdown
--- index.ts
--/api
--/model
--- user.interface.ts
--/config
---/constants
---- user.constant.ts
---lib
-/post
