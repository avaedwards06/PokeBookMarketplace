// ACCOUNT STORAGE

// Get registered accounts

function getAccounts() {
  return JSON.parse(localStorage.getItem('accounts')) || [];
}

function saveAccounts(accounts) {
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

// PASSWORD HASHING

// Hash password
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    "PBKDF2",
    false,
    ['deriveBits']
  );

  const result = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    key,
    256
  );

  return Array.from(new Uint8Array(result))
              .map (byte => byte.toString(16).padStart(2, "0"))
              .join("");
  }

  function convertSalt(saltString) {
    return new Uint8Array(saltString.match(/.{2}/g)
                                    .map(byte => parseInt(byte, 16))
    );
  }

// SIGN-UP FUNCTION

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();


// Get info from signup

  const username = document.getElementById("username").value.trim();

  const email = DocumentTimeline.getElementById("email").value.trim().toLowerCase();

  const password = document.getElementById("password").value;

  const address = document.getElementById("address");

  const message = document.getElementById("message");

  let accounts = getAccounts();

        // Check for existing username
        if (accounts.some(account =>
            account.username.toLowerCase() === username.toLowerCase()
        )) {
            message.textContent = "Username is already taken!";
            return;
        }

        // Check for existing email
        if (accounts.some(account => account.email === email)) {
            message.textContent = "Email is already registered!";
            return;
        }

        try {

            // Generate unique salt
            const salt = crypto.getRandomValues(
                new Uint8Array(16)
            );

            const saltString = Array.from(salt)
                .map(byte => byte.toString(16).padStart(2, "0"))
                .join("");

            // Hash password
            const passwordHash = await hashPassword(password, salt);

            // Create account
            const newAccount = {
                username: username,
                email: email,
                passwordHash: passwordHash,
                salt: saltString,
                address: address
            };

            // Add account to storage
            accounts.push(newAccount);

            saveAccounts(accounts);

            message.textContent =
                "Account created successfully! Redirecting...";

            signupForm.reset();

            // Redirect to login
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1500);

        } catch (error) {

            message.textContent =
                "Something went wrong. Please try again.";

            console.error(error);
        }

    });

}

// ADMIN

const admin_username = "admin";
const admin_password = "1234";

// LOGIN FUNCTION

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        // Get login information
        const username = document.getElementById("username")
            .value.trim();

        const password = document.getElementById("password")
            .value;

        const message = document.getElementById("message");

        if (username === admin_username && admin_password) {
          localStorage.setItem("loggedInUser", "admin");
          localStorage.setItem("userRole", "admin");

          window.location.href = "main.html";
          return;
        }

        // Get saved accounts
        const accounts = getAccounts();

        // Find matching username
        const user = accounts.find(account =>
            account.username.toLowerCase() === username.toLowerCase()
        );

        // Check if account exists
        if (!user) {
            message.textContent = "Username not found!";
            return;
        }

        try {

            // Recreate password hash using saved salt
            const salt = convertSalt(user.salt);

            const passwordHash = await hashPassword(password, salt);

            // Compare passwords
            if (passwordHash === user.passwordHash) {

                // Save logged-in user's username
                localStorage.setItem("loggedInUser", user.username);

                // Redirect to homepage
                window.location.href = "main.html";

            } else {

                message.textContent = "Incorrect password!";

            }

        } catch (error) {

            message.textContent =
                "Unable to log in. Please try again.";

            console.error(error);
        }

    });

}

