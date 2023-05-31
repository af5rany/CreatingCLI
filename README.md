# CreatingCLI
this is a ToDo list CLI using Commander package in Node
every ToDo has:
1 - auto incrementel ID starting from 1 for first id 
2 - title
3 - status which can be ['to-do', 'in progress', 'done'] and it is to-do by default.
# How to use 
1 - to create a todo and give it a title:
      node app.js add -t "the title"
2 - to list all todos:
      node app.js list
3 - to edit a todo by id and give it a new title or change and the status is optional to change:
      node app.js edit -i"1" "the new title" -s"to-do, in progress, done"
4 - to delete a todo by id:
      node app.js delete -i
