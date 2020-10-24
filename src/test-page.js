import Block from './block';

class TestPage extends Block {
    constructor() {
        super('div',
            `
                <div class="root">
                  <h1>Test Page</h1>
                  <div class="content">
                    {{{buttons}}}
                  </div>
                </div>
            `,
            {
            buttons: new ButtonsContainer(),
        });
    }

    bindContent() {
        const containerContent = this.element.querySelector('.content');
        this.props.buttons._bindContent(containerContent);
    }
}

class ButtonsContainer extends Block {
    constructor(props = {}) {
        super('div',
            `
              <div class="root">
                <span class="button1">{{{button1}}}</span>
                <span class="button2">{{{button2}}}</span>
              </div>
            `,
            Object.assign({
                button1Label: 'button 1',
                button2Label: 'another button',
                button1: new Button({
                    label: props.button1Label || 'button 1',
                    onClick: () => {
                        this.setProps({ button1Label: "new label of the first button" })
                    }
                }),
                button2: new Button({
                    label: props.button2Label || 'another button',
                    onClick: () => console.log("click button 2!")
                }),
            }, props));
    }

    setProps(props) {
        this.props.button1.setProps({
            label: props.button1Label ?? this.props.button1Label
        });
        this.props.button2.setProps({
            label: props.button2Label ?? this.props.button2Label
        });
        super.setProps(props);
    }

    bindContent() {
        const button1Content = this.element.querySelector('.button1');
        const button2Content = this.element.querySelector('.button2');
        this.props.button1._bindContent(button1Content);
        this.props.button2._bindContent(button2Content);
    }
}

class Button extends Block {
    constructor(props = {}) {
        super('span',
            `
              <span class="root">
                <button>{{label}}</button>
              </span>`,
            Object.assign({
            label: "Default Label",
            onClick: () => { console.log("click the button!") },
        }, props));
    }

    bindContent() {
        const button = this.element.querySelector('button');
        button.addEventListener('click', this.props.onClick);
    }
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export default TestPage;
