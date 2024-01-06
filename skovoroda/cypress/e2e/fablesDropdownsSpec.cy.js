describe('Fables Dropdowns Spec', () => {
  it('Switch between Fables should be fine', () => {
    
    const dropdown1Id = 'input#dropdown1-fable';
    const dropdown2Id = 'input#dropdown2-fable';
    function cyGetDropdownItem(dropdownNumber, itemValue) {
      return cy.get(`div[aria-labelledby="dropdown${dropdownNumber}-fable-label"] div[value="${itemValue}"]`);
    }

    // Fable Page number 1 in translation of Fedorak
    cy.visit('/texts/fables/fable-1-fedorak');
    cy.get(dropdown1Id).should('have.value', 'Федорак Назар Любомирович');
    cy.get(dropdown2Id).should('have.value', '1 – Собаки');
    
    // Open dropdown2 list
    cy.get(dropdown2Id).click();
    cy.url().should('include', '/texts/fables/fable-1-fedorak');
    
    // Click to Fable number 3
    cyGetDropdownItem(2, 3).click(); 
    cy.get(dropdown1Id).should('have.value', 'Федорак Назар Любомирович');
    cy.get(dropdown2Id).should('have.value', '3 – Жайворонки');
    cy.url().should('include', '/texts/fables/fable-3-fedorak');
    cy.get('h1').should('have.text', 'Байка 3 – Жайворонки');

    // Open dropdown1 list
    cy.get(dropdown1Id).click();
    cy.url().should('include', '/texts/fables/fable-3-fedorak');

    // Click to Original translation
    cyGetDropdownItem(1, 0).click();
    cy.get(dropdown1Id).should('have.value', 'Оригінал');
    cy.get(dropdown2Id).should('have.value', '3 – Жаворонки');
    cy.url().should('include', '/texts/fables/fable-3-original');
    cy.get('h1').should('have.text', 'Басня 3 – Жаворонки');

    // Open dropdown2 list
    cy.get(dropdown2Id).click();

    // Click to Fable number 5
    cyGetDropdownItem(2, 5).click();
    cy.get(dropdown1Id).should('have.value', 'Оригінал');
    cy.get(dropdown2Id).should('have.value', '5 – Чиж и Щиглик');
    cy.url().should('include', '/texts/fables/fable-5-original');
    cy.get('h1').should('have.text', 'Басня 5 – Чиж и Щиглик');
  });
})