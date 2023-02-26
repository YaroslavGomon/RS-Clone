export default class Popups {
    private btnText: string;
    private placeholdersRegister: string[] = ['name', 'phone', 'e-mail', 'password'];
    private placeholdersLogin: string[] = ['e-mail', 'password'];

    constructor(btnText: string) {
        this.btnText = btnText;
    }

    create(type: string, placeholder: string) {
        const fragment = document.createDocumentFragment();

        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal__wrapper');
        fragment.append(modalWrapper);

        const modalInput = document.createElement('input');
        modalInput.classList.add('modal__input', placeholder);
        modalInput.type = type;
        modalInput.placeholder = placeholder;
        modalWrapper.append(modalInput);

        return fragment;
    }

    addStructure() {
        const body = document.querySelector('body');

        if (body) {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            body.prepend(modal);

            const modalForm = document.createElement('form');
            modalForm.classList.add('modal__form');
            modal.append(modalForm);

            const modalTitle = document.createElement('h2');
            modalTitle.classList.add('modal__title', 'modal__title--personal');
            modalTitle.textContent = `${this.btnText}`;
            modalForm.append(modalTitle);
        }
    }

    createInputsReg() {
        this.placeholdersRegister.forEach((val, i) => {
            const fragment = this.create(i !== this.placeholdersRegister.length - 2 ? 'text' : 'email', val);
            const modalForm = document.querySelector('.modal__form');
            if (modalForm) modalForm.append(fragment);
        });
    }

    createInputsLogin() {
        this.placeholdersLogin.forEach((val, i) => {
            const fragment = this.create(i !== 0 ? 'text' : 'email', val);
            const modalForm = document.querySelector('.modal__form');
            if (modalForm) modalForm.append(fragment);
        });
    }

    closeModal() {
        const modal = document.querySelector('.modal');
        const body = document.querySelector('body');

        if (modal && body) {
            modal.addEventListener('click', (e) => {
                if (e.target && e.target instanceof HTMLElement && e.target.classList.contains('modal')) {
                    e.target.remove();
                }
            });
        }
    }

    draw() {
        console.log(this.btnText);
        if (this.btnText === 'register' || this.btnText === 'settings') {
            this.addStructure();
            this.createInputsReg();
        } else if (this.btnText !== 'logout') {
            this.addStructure();
            this.createInputsLogin();
        }
        this.closeModal();
    }
}
