Cypress.Commands.add('solveGoogleReCAPTCHA', (value: string) => {
  // Wait until the iframe (Google reCAPTCHA) is totally loaded
  cy.wait(500)
  cy.get('iframe')
    .first()
    .then((recaptchaIframe) => {
      const body = recaptchaIframe.contents()
      cy.wrap(body).find('.recaptcha-checkbox').should('exist').click()
    })
})
