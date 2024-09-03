import { makeObservable, observable, computed, action } from 'mobx';

export default class Todo {
    todo = [];

    constructor() {
        makeObservable(this, {
            todo: observable,
            addTask: action,
            getTaskLeft: computed
        });
    }

    addTask(item) {
        this.todo.push({
            task: item,
            isFinished: false
        });
    }

    get getTaskLeft() {
        return this.todo.filter(item => !item.isFinished).length;
    }
}

