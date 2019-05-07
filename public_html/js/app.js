/* 
    Created on : 04/02/2019, 03:40:00 PM
    Author     : Ricardo Presilla.
    Licencia GNU.
*/
/**Componente del checkbox */
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
});
/**Componente del boton y el input*/
Vue.component('todo-add',{
    template: `
        <div>
            Escriba una tarea:
            <input type="text" id="tarea" v-model="title" />
            <base-checkbox v-model="completed"></base-checkbox>
            <button @click="onClick">Añadir</button>
        </div>
    `,
    data: function(){
        return {
            title: null, 
            completed: false
        }
    },
    methods: {
        onClick: function(){
            this.$emit('new', { title: this.title, completed: this.completed });
        }
    }
});
/**Componente hijo*/
Vue.component('todo-item', {
    props: ['todo'],
    template: `
        <li>Tarea: {{ todo.title }} Completado: <base-checkbox v-model="todo.completed"></base-checkbox></li>
    `
});
/**Componente padre*/
Vue.component('todo-list', {
    props: ['todos'],
    template: `
    <ul>
        <todo-item 
          v-for="(todo, index) in todos" 
          :key="index"
          :todo="todo">
        </todo-item>
    </ul> 
    `
    });
/**Instancia del vue*/
var vue = new Vue({
    el: '#app',
    data: {
        todos: [
            { title: 'Actividad 1', completed: false},
            { title: 'Actividad 2', completed: false},
            { title: 'Actividad 3', completed: false},
        ]
    },
    template: `
    <div>
        <todo-list 
            :todos="todos">
        </todo-list> 
        <todo-add @new="addNewTodo"></todo-add>
    </div>
    `,
    methods: {
        addNewTodo: function(todo){
            this.todos.push(todo);
        }
    }
});

