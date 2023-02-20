export default class AccountBtns {
    private addButtons() {
        const menu = document.querySelector('.menu');
        if (menu) {
            const menuLogin = document.createElement('div');
            menuLogin.classList.add('menu__personal');
            menu.append(menuLogin);

            const buttonNames = ['register', 'login', 'logout'];

            buttonNames.forEach((val) => {
                const button = document.createElement('button');
                button.classList.add(`menu__${val}`, 'menu__btn');
                button.textContent = val;
                menuLogin.append(button);
            });

            const menuAccount = document.createElement('div');
            menuAccount.classList.add('menu__item', 'account');
            menu.append(menuAccount);

            const menuItemLogo = document.createElement('span');
            menuItemLogo.classList.add('menu__item-logo', 'account');
            menuAccount.append(menuItemLogo);

            const menuItemText = document.createElement('p');
            menuItemText.classList.add('menu__item-text', 'account');
            menuItemText.textContent = 'Account';
            menuAccount.append(menuItemText);
        }
    }

    private openCloseAccountBtns() {
        const menuLogin = document.querySelector('.menu__personal');
        if (menuLogin) {
            if (menuLogin.classList.contains('active')) {
                menuLogin.classList.remove('active');
            } else {
                menuLogin.classList.add('active');
            }
        }
    }

    private addListeners() {
        const menuAccount = document.querySelector('.menu__item.account');
        const menuLogin = document.querySelector('.menu__personal');
        if (menuAccount) menuAccount.addEventListener('click', this.openCloseAccountBtns);
        if (menuLogin) {
            menuLogin.addEventListener('click', (e) => {
                if (e.target && e.target instanceof HTMLButtonElement) {
                    if (e.target.classList.contains('menu__btn')) this.openCloseAccountBtns();
                }
            });
        }
    }

    public draw() {
        this.addButtons();
        this.addListeners();
    }
}
