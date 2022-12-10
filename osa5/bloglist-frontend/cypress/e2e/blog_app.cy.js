describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpass')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpasswords')
      cy.get('#login-button').click()


      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpass' })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click()

      cy.contains('Test Blog')
    })

  })

  describe('When logged in and a blog exists', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpass' })
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 0
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be liked', function () {
      cy.contains('Test Blog').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('Test Blog').click()
      cy.contains('remove').click()

      cy.get('html').should('not.contain', 'Test Blog')
    })

    it('A blog cant be deleted by another user', function () {
      cy.contains('logout').click()
      const user = {
        name: 'Test User 2',
        username: 'testuser2',
        password: 'testpass2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'testuser2', password: 'testpass2' })
      cy.visit('http://localhost:3000')


      cy.contains('Test Blog').click()
        .should('not.contain', 'remove')
    })

  })

  describe('When multiple blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpass' })
      cy.createBlog({
        title: 'Test Blog 1',
        author: 'Test Author 1',
        url: 'http://testurl1.com',
        likes: 1
      })
      cy.createBlog({
        title: 'Test Blog 2',
        author: 'Test Author 2',
        url: 'http://testurl2.com',
        likes: 2
      })
      cy.createBlog({
        title: 'Test Blog 3',
        author: 'Test Author 3',
        url: 'http://testurl3.com',
        likes: 5
      })

      
    })
    
    it('Blogs are ordered by likes', function () {
      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).should('contain', 'Test Blog 3')
      cy.get('.blog').eq(1).should('contain', 'Test Blog 2')
      cy.get('.blog').eq(2).should('contain', 'Test Blog 1')
    })

  })
})