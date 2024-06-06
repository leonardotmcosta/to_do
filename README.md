### Eventos e Funções

#### 1. Carregar as Tarefas ao Iniciar

```javascript
document.addEventListener('DOMContentLoaded', loadTasks);
```

- **`document.addEventListener('DOMContentLoaded', loadTasks);`**: Adiciona um evento que escuta quando o conteúdo do DOM foi completamente carregado. Quando isso acontece, a função `loadTasks` é chamada para carregar as tarefas armazenadas no localStorage.

#### 2. Adicionar Tarefa ao Clicar no Botão

```javascript
document.getElementById('addTaskButton').addEventListener('click', addTask);
```

- **`document.getElementById('addTaskButton').addEventListener('click', addTask);`**: Adiciona um evento de clique ao botão de adicionar tarefa. Quando o botão é clicado, a função `addTask` é chamada.

### Funções Principais

#### 3. Função `addTask`

```javascript
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
}
```

- **`const taskInput = document.getElementById('taskInput');`**: Obtém o elemento de entrada de texto onde o usuário digita a nova tarefa.
- **`const task = taskInput.value.trim();`**: Obtém o valor da entrada de texto e remove espaços em branco das extremidades.
- **`if (task) { ... }`**: Verifica se a entrada não está vazia.
  - **`addTaskToDOM(task);`**: Adiciona a nova tarefa ao DOM.
  - **`saveTaskToLocalStorage(task);`**: Salva a nova tarefa no localStorage.
  - **`taskInput.value = '';`**: Limpa o campo de entrada de texto.

#### 4. Função `addTaskToDOM`

```javascript
function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task';
    li.appendChild(document.createTextNode(task));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.addEventListener('click', () => {
        removeTaskFromDOM(li);
        removeTaskFromLocalStorage(task);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}
```

- **`const taskList = document.getElementById('taskList');`**: Obtém o elemento `<ul>` onde as tarefas serão listadas.
- **`const li = document.createElement('li');`**: Cria um novo elemento `<li>` para a nova tarefa.
- **`li.className = 'task';`**: Define a classe CSS para o novo `<li>`.
- **`li.appendChild(document.createTextNode(task));`**: Adiciona o texto da tarefa ao `<li>`.
- **`const deleteButton = document.createElement('button');`**: Cria um botão para excluir a tarefa.
- **`deleteButton.className = 'delete-button';`**: Define a classe CSS para o botão.
- **`deleteButton.appendChild(document.createTextNode('Delete'));`**: Adiciona o texto "Delete" ao botão.
- **`deleteButton.addEventListener('click', () => { ... });`**: Adiciona um evento de clique ao botão para remover a tarefa.
  - **`removeTaskFromDOM(li);`**: Remove a tarefa do DOM.
  - **`removeTaskFromLocalStorage(task);`**: Remove a tarefa do localStorage.
- **`li.appendChild(deleteButton);`**: Adiciona o botão de exclusão ao `<li>`.
- **`taskList.appendChild(li);`**: Adiciona o `<li>` ao `<ul>`.

#### 5. Função `loadTasks`

```javascript
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}
```

- **`const tasks = getTasksFromLocalStorage();`**: Obtém a lista de tarefas armazenadas no localStorage.
- **`tasks.forEach(task => addTaskToDOM(task));`**: Para cada tarefa na lista, chama `addTaskToDOM` para adicionar a tarefa ao DOM.

#### 6. Função `getTasksFromLocalStorage`

```javascript
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
```

- **`const tasks = localStorage.getItem('tasks');`**: Obtém a string JSON armazenada no localStorage sob a chave `tasks`.
- **`return tasks ? JSON.parse(tasks) : [];`**: Se houver tarefas armazenadas, faz o parsing da string JSON para um array e retorna esse array. Caso contrário, retorna um array vazio.

#### 7. Função `saveTaskToLocalStorage`

```javascript
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
```

- **`const tasks = getTasksFromLocalStorage();`**: Obtém a lista de tarefas armazenadas no localStorage.
- **`tasks.push(task);`**: Adiciona a nova tarefa à lista.
- **`localStorage.setItem('tasks', JSON.stringify(tasks));`**: Converte a lista de tarefas para uma string JSON e a armazena no localStorage sob a chave `tasks`.

#### 8. Função `removeTaskFromDOM`

```javascript
function removeTaskFromDOM(taskElement) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskElement);
}
```

- **`const taskList = document.getElementById('taskList');`**: Obtém o elemento `<ul>` onde as tarefas são listadas.
- **`taskList.removeChild(taskElement);`**: Remove o elemento de tarefa do DOM.

#### 9. Função `removeTaskFromLocalStorage`

```javascript
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
```

- **`let tasks = getTasksFromLocalStorage();`**: Obtém a lista de tarefas armazenadas no localStorage.
- **`tasks = tasks.filter(t => t !== task);`**: Filtra a lista de tarefas, removendo a tarefa que foi excluída.
- **`localStorage.setItem('tasks', JSON.stringify(tasks));`**: Converte a lista de tarefas atualizada para uma string JSON e a armazena no localStorage.

### Resumo

Este código implementa uma aplicação simples de ToDo list que permite adicionar e remover tarefas. As tarefas são armazenadas no localStorage, garantindo que persistam entre as sessões do navegador. A estrutura principal inclui funções para adicionar tarefas ao DOM e ao localStorage, carregar tarefas do localStorage ao iniciar, e remover tarefas do DOM e do localStorage quando solicitado.
