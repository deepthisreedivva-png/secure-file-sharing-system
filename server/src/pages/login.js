export function loginPage() {

  return `

    <div class="container">

      <h1>Login</h1>

      <input
        type="email"
        id="loginEmail"
        placeholder="Enter Email"
      />

      <input
        type="password"
        id="loginPassword"
        placeholder="Enter Password"
      />

      <button id="loginBtn">
        Login
      </button>

      <button
        class="register-btn"
        id="goRegister"
      >
        Go To Register
      </button>

    </div>

  `
}