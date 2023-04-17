describe('homepage', () => {
  beforeEach('go to homepage', () => {
    cy.visit('http://localhost:3000/')
  })
  it('get in touch', () => {
    cy.contains('Title Generator')
    cy.contains('Powered by AI')
    cy.get("input[name='name']").type('test user')
    cy.get("input[name='email']").type('testuser123@gmail.com')
    cy.get("textarea[name='message']").type(
      'Do you struggle to come up with attention-grabbing titles for your blog or post? Look no further! Use our tool to generate a plethora of innovative title ideas and improve your content strategy today.'
    )
    cy.solveGoogleReCAPTCHA('6LcNZf4kAAAAAP_08qthiKFOd7JWz6IdPGjZzH-g')
  })
})
