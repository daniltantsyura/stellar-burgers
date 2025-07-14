import { testUrl } from "cypress/constants";

describe('Проверка доступности приложения', () => {
    it('сервис должен быть доступен по адресу ' + testUrl, () => {
        cy.visit(testUrl!);
    });
});