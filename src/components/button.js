import Block from '../utils/block';

class Button extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("button", props);
    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return `<div>${this.props.text}</div>`;
    }
}

class Button2 extends Block {
    constructor(props) {
        super('button', props);
    }

    render() {
        return `<div>${Button(this.props).render()}</div>`
    }
}
