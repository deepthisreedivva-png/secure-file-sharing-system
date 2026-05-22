export function registerPage() {

  return `

    <div class="container">

      <h1>Register</h1>

      <input
        type="text"
        id="registerUsername"
        placeholder="Enter Username"
      />

      <input
        type="email"
        id="registerEmail"
        placeholder="Enter Email"
      />

      <input
        type="password"
        id="registerPassword"
        placeholder="Enter Password"
      />

      <button id="registerBtn">
        Register
      </button>

      <button
        class="register-btn"
        id="goLogin"
      >
        Go To Login
      </button>

    </div>

  `
}