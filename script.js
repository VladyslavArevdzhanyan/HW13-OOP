class TodoList {
    constructor(el) {
      this.todos = [];
      this.el = el;
      this.el.addEventListener('click', (event) => {
          let target = event.target;
          let id = target.parentNode.dataset.id;
          if(target.classList.contains('set-status')) {
              this.changeStatus(id);
          } else if (target.classList.contains('delete-task')) {
              this.removeTodo(id);
        }
      })
    }
    
    addTodo(todo) {
      this.todos.push(todo);
    }
    removeTodo(id) {
      this.todos = this.todos.filter((el) => {
        return el.id !== id;
      });
      let ulDelete = document.querySelectorAll(`[data-id="${id}"]`)[0];
      ulDelete.remove();
    }
    getTodos() {
      return this.todos;
    }
    changeStatus(id) {
      let index = this.todos.findIndex((el) => el.id === id);
      this.todos[index].status = !this.todos[index].status;
      let ulChange = document.querySelectorAll(`[data-id="${id}"]`)[0];

      if(this.todos[index].status) {
        ulChange.classList.remove('yellow')
        ulChange.classList.add('green')
      } else {
        ulChange.classList.remove('green')
        ulChange.classList.add('yellow')
      }

    }
    render() {
      let lis = '';
      for (let el of this.todos) {
        if (!el) {
          return;
        }
        lis += `<li data-id="${el.id}">${el.value}<button class="delete-task">Delete</button><button class="set-status">Change status</button></li>`;
      }
      this.el.innerHTML = lis;
    }

  }
  
  class Task {
    constructor(value, status) {
      this.value = value;
      this.status = status;
      this.id = Math.random().toString(36).substr(2, 9);
    }
  }



let input = document.getElementById('inputText');
let list = document.getElementById('list');
let btn = document.getElementById('applyBtn')
let createLi = new TodoList(list);

btn.addEventListener('click', function (event) {
    let target = event.target;
    if (target) {
        createLi.addTodo(new Task(input.value, false));
        createLi.render();
        input.value = '';
    } 
})



