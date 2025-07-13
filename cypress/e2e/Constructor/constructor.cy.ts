import mockIngredients from '../../../mocks/ingredients.json';
import mockUser from '../../../mocks/userResponse.json';
import mockOrder from '../../../mocks/order.json';
import mockTockens from '../../../mocks/tokens.json';


before(() => {
    cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: { data: mockIngredients, success: true }
    }).as('getIngredients');




});

beforeEach(() => {
    cy.visit('http://localhost:4000');
});

describe('Добавление ингредиентов', () => {

    it('Добавление булочки', () => {

        cy.get("[data-test-id='ingredient-bun']").each(bun => {
            const bunName = bun.find('[data-test-id="bun-name"]').text();

            cy.wrap(bun).find('button.common_button').then((button) => {
                expect(button).to.exist;
                expect(button.text()).to.include('Добавить');

                cy.wrap(button).click();

                cy.get('[data-test-id="top-bun"]').should('contain', bunName);
                cy.get('[data-test-id="bottom-bun"]').should('contain', bunName);
            });
        })
    });

    it('Добавление начинки', () => {
        cy.get("[data-test-id='ingredient-main'], [data-test-id='ingredient-sauce']").each((bun, index) => {
            const ingredientName = bun.find('[data-test-id="main-name"], [data-test-id="main-name"]').text();

            cy.wrap(bun).find('button.common_button').then((button) => {
                expect(button).to.exist;
                expect(button.text()).to.include('Добавить');

                cy.wrap(button).click();

                cy.get('[data-test-id="ingredient-list"]').should('contain', ingredientName);
                cy.get('[data-test-id="ingredient-list"] li').should('have.length', index + 1);
            });
        });
    });
});

describe('Работа модальных окон', () => {
    it('Модальное окно ингредиента открывается и закрывается по клику на кнопку закрытия и оверлей', () => {
        cy.get("[data-test-id='ingredient-main'], [data-test-id='ingredient-sauce'], [data-test-id='ingredient-bun']").each((card) => {
            cy.wrap(card).find('a').then((link) => {
                expect(link).to.exist;
                cy.wrap(link).click();
                const modal = cy.get("[data-test-id='modal']");
                modal.should('be.visible');
                cy.get("[data-test-id='close-button']").click();
                cy.wrap(link).click();
                cy.get("[data-test-id='overlay']").click({ force: true });
            });
        });

    });
});

describe('Создание заказа', () => {
    it('Заказ создается и очищается', () => {
        cy.intercept('GET', 'api/auth/user', {
            statusCode: 200,
            body: {
                success: true,
                user: mockUser,
                ...mockTockens
            }
        }).as('getUser');

        cy.intercept('POST', 'api/orders', {
            statusCode: 200,
            body: mockOrder
        }).as('getUser');

        const bun = cy.get("[data-test-id='ingredient-bun']");
        const main = cy.get("[data-test-id='ingredient-main']");
        const bunAddButton = bun.contains('button', 'Добавить');
        const mainAddButton = main.contains('button', 'Добавить');
        const orderButton = cy.contains('button', 'Оформить заказ');

        orderButton.should('be.visible')

        bunAddButton.click();
        mainAddButton.click();
        orderButton.click();

        const modal = cy.get("[data-test-id='modal']");

        modal.should('be.visible');
        modal.should('contain', mockOrder.order.number);
        cy.get("[data-test-id='close-button']").click();

        const constructor = cy.get('[data-test-id="constructor"]');

        constructor.should('contain', 'Выберите булки');
        constructor.should('contain', 'Выберите начинку');
    });
})