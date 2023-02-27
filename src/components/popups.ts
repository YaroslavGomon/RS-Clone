import { Authentication, Authorization, Regestration } from './api/authorizationController';
// import { Regestration } from './api/authorizationController';
import { user } from './types/type';

export default class Popups {
    // private authentication: Authentication;
    private registration: Regestration;
    private btnText: string;
    private placeholdersRegister: string[] = ['name', 'phone', 'e-mail', 'password'];
    private namesRegister: string[] = ['userName', 'phone', 'email', 'userPassword'];
    private placeholdersLogin: string[] = ['e-mail', 'password'];
    private namesLogin: string[] = ['email', 'userPassword'];

    constructor(btnText: string) {
        this.btnText = btnText;
        this.registration = new Regestration();
    }

    private addStructure() {
        const body = document.querySelector('body');

        if (body) {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            body.prepend(modal);

            const modalForm = document.createElement('div');
            modalForm.classList.add('modal__form');
            modal.append(modalForm);

            const modalTitle = document.createElement('h2');
            modalTitle.classList.add('modal__title', 'modal__title--personal');
            modalTitle.textContent = `${this.btnText}`;
            modalForm.append(modalTitle);
        }
    }

    private create(type: string, placeholder: string, name: string) {
        const fragment = document.createDocumentFragment();

        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal__wrapper');
        fragment.append(modalWrapper);

        const modalInput = document.createElement('input');
        modalInput.classList.add('modal__input', placeholder);
        modalInput.type = type;
        modalInput.placeholder = placeholder;
        modalInput.name = name;
        modalWrapper.append(modalInput);

        return fragment;
    }

    private createInputsReg() {
        this.placeholdersRegister.forEach((val, i) => {
            const fragment = this.create(
                i !== this.placeholdersRegister.length - 2 ? 'text' : 'email',
                val,
                this.namesRegister[i]
            );
            const modalForm = document.querySelector('.modal__form');
            if (modalForm) modalForm.append(fragment);
        });
    }

    private createInputsSettings() {
        this.placeholdersRegister.forEach((val, i) => {
            const fragment = this.create(
                i !== this.placeholdersRegister.length - 2 ? 'text' : 'email',
                val,
                this.namesRegister[i]
            );
            const modalForm = document.querySelector('.modal__form');
            if (modalForm) modalForm.append(fragment);
        });
    }

    private createInputsLogin() {
        this.placeholdersLogin.forEach((val, i) => {
            const fragment = this.create(i !== 0 ? 'text' : 'email', val, this.namesLogin[i]);
            const modalForm = document.querySelector('.modal__form');
            if (modalForm) modalForm.append(fragment);
        });
    }

    private addBtnRegister() {
        const modalForm = document.querySelector('.modal__form');
        const btn = document.createElement('button');
        btn.textContent = 'Register';
        btn.classList.add('btn-register', 'btn-form');
        if (modalForm) {
            modalForm.append(btn);
            btn.addEventListener('click', (e) => {
                e.preventDefault;
                this.registerUser();
            });
        }
    }

    private addBtnLogin() {
        const modalForm = document.querySelector('.modal__form');
        const btn = document.createElement('button');
        btn.textContent = 'Login';
        btn.classList.add('btn-login', 'btn-form');
        if (modalForm) {
            modalForm.append(btn);
            btn.addEventListener('click', (e) => {
                e.preventDefault;
                this.loginUser();
            });
        }
    }
    private addBtnUpdate() {
        const modalForm = document.querySelector('.modal__form');
        const btn = document.createElement('button');
        btn.textContent = 'Update';
        btn.classList.add('btn-update', 'btn-form');
        if (modalForm) {
            modalForm.append(btn);
            btn.addEventListener('click', (e) => {
                e.preventDefault;
                this.updateUser();
            });
        }
    }
    private addBtnDelete() {
        const modalForm = document.querySelector('.modal__form');
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.classList.add('btn-delete', 'btn-form');
        if (modalForm) {
            modalForm.append(btn);
            btn.addEventListener('click', (e) => {
                e.preventDefault;
                this.deleteUser();
              });
        }
    }

    private registerUser() {
        const user: user = {
            email: '',
            phone: '',
            userName: '',
            userPassword: '',
        };
        const inputName = document.querySelector('.modal__input.name') as HTMLInputElement;
        const inputEmail = document.querySelector('.modal__input.e-mail') as HTMLInputElement;
        const inputPhone = document.querySelector('.modal__input.phone') as HTMLInputElement;
        const inputPass = document.querySelector('.modal__input.password') as HTMLInputElement;
        user.userName = inputName.value;
        user.userPassword = inputPass.value;
        user.email = inputEmail.value;
        user.phone = inputPhone.value;
        console.log(user);
        if (Object.values(user).every((val) => val !== '')) {
            this.registration.addUser(user);
        }
    }

    private updateUser() {
        const user: user = {
            email: '',
            phone: '',
            userName: '',
            userPassword: '',
        };
        const inputName = document.querySelector('.modal__input.name') as HTMLInputElement;
        const inputEmail = document.querySelector('.modal__input.e-mail') as HTMLInputElement;
        const inputPhone = document.querySelector('.modal__input.phone') as HTMLInputElement;
        const inputPass = document.querySelector('.modal__input.password') as HTMLInputElement;
        user.userName = inputName.value;
        user.userPassword = inputPass.value;
        user.email = inputEmail.value;
        user.phone = inputPhone.value;
        if (localStorage.getItem('userEmail')) {
            if (Object.values(user).every((val) => val !== '')) {
                const update = new Authorization(localStorage.getItem('userEmail') as string);
                console.log(user);
                update.updateUser(user);
            }
        }
    }

    private deleteUser() {
      const inputEmail = document.querySelector('.modal__input.e-mail') as HTMLInputElement;

      const deletedUser = new Authorization(inputEmail.value);
      deletedUser.deleteUser();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userEmail');
    }

    private fillInputs() {
        const inputName = document.querySelector('.modal__input.name') as HTMLInputElement;
        const inputEmail = document.querySelector('.modal__input.e-mail') as HTMLInputElement;
        const inputPhone = document.querySelector('.modal__input.phone') as HTMLInputElement;
        const inputPass = document.querySelector('.modal__input.password') as HTMLInputElement;
        const userData: user = JSON.parse(localStorage.getItem('currentUser') as string);

        if (userData) {
            inputEmail.value = userData.email;
            inputName.value = userData.userName;
            inputPhone.value = userData.phone;
            inputPass.value = userData.userPassword;
        }
    }

    private loginUser() {
        const inputEmail = document.querySelector('.modal__input.e-mail') as HTMLInputElement;
        const inputPass = document.querySelector('.modal__input.password') as HTMLInputElement;
        const login = new Authentication(inputEmail.value, inputPass.value);
        login.signIn();
        localStorage.setItem('userEmail', inputEmail.value);
    }

    private logOut() {
        const logoutBtn = document.querySelector('.menu__logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (localStorage.getItem('userEmail')) {
                    const logout = new Authorization(localStorage.getItem('userEmail') as string);
                    logout.signOut();
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('userEmail');
                }
            });
        }
    }

    private closeModal() {
        const modal = document.querySelector('.modal');
        const body = document.querySelector('body');
        const btnForm = document.querySelectorAll('.btn-form');

        if (modal && body) {
            modal.addEventListener('click', (e) => {
                if (e.target && e.target instanceof HTMLElement && e.target.classList.contains('modal')) {
                    e.target.remove();
                }
            });
            if (btnForm) {
                btnForm.forEach((val) => {
                    val.addEventListener('click', () => {
                        modal.remove();
                    });
                });
            }
        }
    }

    public draw() {
        if (this.btnText === 'register') {
            this.addStructure();
            this.createInputsReg();
            this.addBtnRegister();
        } else if (this.btnText === 'settings') {
            this.addStructure();
            this.createInputsSettings();
            this.fillInputs();
            this.addBtnUpdate();
            this.addBtnDelete();
        } else if (this.btnText === 'login') {
            this.addStructure();
            this.createInputsLogin();
            this.addBtnLogin();
        }
        // this.changeAccountBtnText();
        this.closeModal();
        this.logOut();
    }
}
