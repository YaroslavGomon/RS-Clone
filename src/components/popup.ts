export default class Popup {
    addButtons() {
        const menu = document.querySelector('.menu');
        if (menu) {
            const menuLogin = document.createElement('div');
            menuLogin.classList.add('menu__personal', 'active');
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

        this.addListeners();
    }

    addListeners() {
        const menuLogin = document.querySelector('.menu__personal');
        const menuAccount = document.querySelector('.menu__item.account');
        if (menuLogin && menuAccount) {
            menuAccount.addEventListener('click', () => {
                menuLogin.classList.toggle('active');
            });
        }
    }
}
