```mermaid

graph LR
  User -->|Open /signUp| signUpController
  signUpController -->|renderSignUp Form| User
  signUpController -->|maintain state for keys| signUpControllerState
  signUpControllerState --> email
  signUpControllerState --> name
  signUpControllerState --> username
  signUpControllerState --> password
  signUpControllerState --> confirmPassword
  User -->|Submit Form| signUpController
  signUpController -->|validate keys| Validation
  Validation -->|Show error if validation fails| User
  Validation -->|Call signUp on validation pass| AuthService
  AuthService -->|Request signUp| AuthAPI
  AuthAPI -->|Return token or error| AuthService
  AuthService -->|Return token or error| signUpController
  signUpController -->|Redirect to /friend on token| User
  signUpController -->|Show error on failure| User
  AuthAPI -->|Calls| /auth/signUp
  User -->|Open /signIn| signInController
  signInController -->|renderSignIn Form| User
  signInController -->|maintain state for keys| signInControllerState
  signInControllerState --> username
  signInControllerState --> password
  User -->|Submit Form| signInController
  signInController -->|validate keys| signInValidation
  signInValidation -->|Show error if validation fails| User
  signInValidation -->|Call signIn on validation pass| AuthService
  AuthService -->|Request signIn| AuthAPI
  AuthAPI -->|Return token or error| AuthService
  AuthService -->|Return token or error| signInController
  signInController -->|Redirect to /friend on token| User
  signInController -->|Show error on failure| User
  AuthAPI -->|Calls| /auth/signIn
