import './style.css'

import { loginPage } from './pages/login'
import { registerPage } from './pages/register'

const app =
  document.querySelector('#app')

const loggedInUser =
  localStorage.getItem(
    'loggedInUser'
  )

if (loggedInUser) {

  showDashboard()

} else {

  showLogin()

}

/*
===================================
LOGIN
===================================
*/

function showLogin() {

  app.innerHTML =
    loginPage()

  const goRegister =
    document.getElementById(
      'goRegister'
    )

  goRegister.addEventListener(
    'click',
    () => {

      showRegister()

    }
  )

  const loginBtn =
    document.getElementById(
      'loginBtn'
    )

  loginBtn.addEventListener(
    'click',
    async () => {

      const email =
        document.getElementById(
          'loginEmail'
        ).value

      const password =
        document.getElementById(
          'loginPassword'
        ).value

      const response =
        await fetch(

          'http://localhost:5000/login',

          {

            method: 'POST',

            headers: {

              'Content-Type':
                'application/json'

            },

            body: JSON.stringify({

              email,

              password

            })

          }

        )

      const data =
        await response.json()

      if (!response.ok) {

        alert(data.message)

        return

      }

      localStorage.setItem(

        'loggedInUser',

        JSON.stringify(
          data.user
        )

      )

      localStorage.setItem(
        'token',
        data.token
      )

      alert(
        'Login Successful'
      )

      showDashboard()

    }
  )

}

/*
===================================
REGISTER
===================================
*/

function showRegister() {

  app.innerHTML =
    registerPage()

  const goLogin =
    document.getElementById(
      'goLogin'
    )

  goLogin.addEventListener(
    'click',
    () => {

      showLogin()

    }
  )

  const registerBtn =
    document.getElementById(
      'registerBtn'
    )

  registerBtn.addEventListener(
    'click',
    async () => {

      const username =
        document.getElementById(
          'registerUsername'
        ).value

      const email =
        document.getElementById(
          'registerEmail'
        ).value

      const password =
        document.getElementById(
          'registerPassword'
        ).value

      const response =
        await fetch(

          'http://localhost:5000/register',

          {

            method: 'POST',

            headers: {

              'Content-Type':
                'application/json'

            },

            body: JSON.stringify({

              username,

              email,

              password

            })

          }

        )

      const data =
        await response.json()

      alert(data.message)

      showLogin()

    }
  )

}

/*
===================================
DASHBOARD
===================================
*/

async function showDashboard() {

  const loggedInUser =
    JSON.parse(

      localStorage.getItem(
        'loggedInUser'
      )

    )

  app.innerHTML = `

    <div class="container">

      <h1>Dashboard</h1>

      <p>
        Welcome ${loggedInUser.username}
      </p>

      <p>
        ${loggedInUser.email}
      </p>

      <input
        type="file"
        id="fileInput"
      />

      <button id="uploadBtn">
        Upload File
      </button>

      <div id="filesContainer">

      </div>

      <button id="logoutBtn">
        Logout
      </button>

    </div>

  `

  /*
  ===================================
  LOAD FILES
  ===================================
  */

  const filesResponse =
    await fetch(
      'http://localhost:5000/files'
    )

  const files =
    await filesResponse.json()

  const filesContainer =
    document.getElementById(
      'filesContainer'
    )

  filesContainer.innerHTML =
    '<h3>Uploaded Files</h3>'

  files.forEach((file) => {

    filesContainer.innerHTML += `

      <div>

        <p>${file}</p>

        <a
          href="http://localhost:5000/download/${file}"
          download
        >

          Download

        </a>

        <button
          onclick="deleteFile('${file}')"
        >

          Delete

        </button>

      </div>

    `

  })

  /*
  ===================================
  UPLOAD FILE
  ===================================
  */

  const uploadBtn =
    document.getElementById(
      'uploadBtn'
    )

  uploadBtn.addEventListener(
    'click',
    async () => {

      const file =
        document.getElementById(
          'fileInput'
        ).files[0]

      if (!file) {

        alert(
          'Choose File'
        )

        return

      }

      const formData =
        new FormData()

      formData.append(
        'file',
        file
      )

      const response =
        await fetch(

          'http://localhost:5000/upload-file',

          {

            method: 'POST',

            body: formData

          }

        )

      const data =
        await response.json()

      alert(data.message)

      showDashboard()

    }
  )

  /*
  ===================================
  LOGOUT
  ===================================
  */

  const logoutBtn =
    document.getElementById(
      'logoutBtn'
    )

  logoutBtn.addEventListener(
    'click',
    () => {

      localStorage.removeItem(
        'loggedInUser'
      )

      localStorage.removeItem(
        'token'
      )

      alert(
        'Logged Out'
      )

      showLogin()

    }
  )

}

/*
===================================
DELETE FILE
===================================
*/

window.deleteFile =
  async function (filename) {

    const response =
      await fetch(

        `http://localhost:5000/delete-file/${filename}`,

        {

          method: 'DELETE'

        }

      )

    const data =
      await response.json()

    alert(data.message)

    showDashboard()

  }