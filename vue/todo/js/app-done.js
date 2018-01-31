(function() {
    const app = new Vue({
        el: "#app",
        data: {
            newTask: '',
            tasks: [
                {
                    checked: false,
                    title: 'Task #1'
                },
                {
                    checked: false,
                    title: 'Task #2'
                },
                {
                    checked: false,
                    title: 'Task #3'
                }
            ]
        },
        computed: {
            completed: function() {
                return this.tasks.filter(function(task) {
                    return task.checked === true;
                }).length;
            },
            total: function() {
                return this.tasks.length;
            }
        },
        methods: {
            addTask: function() {
                this.tasks.push({
                    checked: false,
                    title: this.newTask
                });
                this.newTask = '';
            },
            removeTask: function(task) {
                const index = this.tasks.indexOf(task);
                if (index !== -1) this.tasks.splice(index, 1);
            }
        }
    });
})();