import {
  testBun,
  modalButton,
  constructorSection,
} from "../../../src/utils/constant";

console.log(testBun);

describe("service is available", function () {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  });
  it("should open burger constructor page by default and test modal", function () {
    cy.contains(testBun).click();
    cy.get(`${modalButton}`).click();
    cy.contains("Сыр с астероидной плесенью").click();
    cy.get(`${modalButton}`).click();
    cy.contains("Соус традиционный галактический").click();
    cy.get(`${modalButton}`).click();
    cy.contains(testBun).click();
    cy.get(`${modalButton}`).click();
  });

  it("should drag and drop ingredients, login and place an order", function () {
    cy.get(`img[alt*="${testBun}"]`).trigger("dragstart").trigger("dragleave");
    cy.get(constructorSection)
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Сыр с астероидной плесенью"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get(constructorSection)
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Мини-салат Экзо-Плантаго"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get(constructorSection)
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get("button").contains("Оформить заказ").click();

    cy.get('input[type*="email"]').click().type("jkjkkj@yandex.ru");
    cy.get('input[type*="password"]').click().type("123456");
    cy.get("button").contains("Войти").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get("button").contains("Оформить заказ").click();
  });
});
