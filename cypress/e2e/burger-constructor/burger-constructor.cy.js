describe("service is available", function () {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  });
  it("should open burger constructor page by default and test modal", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.get("[class^=modal-header_buttonClose__]").click();
    cy.contains("Сыр с астероидной плесенью").click();
    cy.get("[class^=modal-header_buttonClose__]").click();
    cy.contains("Соус традиционный галактический").click();
    cy.get("[class^=modal-header_buttonClose__]").click();
    cy.contains("Краторная булка N-200i").click();
    cy.get("[class^=modal-header_buttonClose__]").click();
  });

  it("should drag and drop ingredients, login and place an order", function () {
    cy.get('img[alt*="Краторная булка N-200i"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_constructor__container]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Сыр с астероидной плесенью"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_constructor__container]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Мини-салат Экзо-Плантаго"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_constructor__container]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Сыр с астероидной плесенью"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_constructor__container]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get("button").contains("Оформить заказ").click();

    cy.get('input[type*="email"]').click().type("mock@email.com");
    cy.get('input[type*="password"]').click().type("123456");
    cy.get("button").contains("Войти").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get("button").contains("Оформить заказ").click();
  });
});
