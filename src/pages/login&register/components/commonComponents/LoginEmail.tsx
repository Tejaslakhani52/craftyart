import { Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { consoleShow } from "../../../../commonFunction/console";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const firebaseConfig = {
  apiKey: "AIzaSyCQP7F26DBVJvXWNgwS3lerBUCGcbH2z4U",
  authDomain: "craftylogin.firebaseapp.com",
  projectId: "craftylogin",
  storageBucket: "craftylogin.appspot.com",
  messagingSenderId: "291310090237",
  appId: "1:291310090237:web:dafb389be0203fc4d04b94",
};

const app = initializeApp(firebaseConfig);

export const auth: any = getAuth(app);

export default function LoginEmail() {
  const signUpRef = useRef<any>(null);
  const navigate = useNavigate();
  const [forgotPass, setForgotPass] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  consoleShow("currentUser: ", currentUser);
  const [uid, setUid] = useState<any>(null);
  consoleShow("uid: ", uid);
  const [emailPassword, setemailPassword] = useState<any>({
    email: "",
    password: "",
  });
  const [emailDialogShow, setEmailDialogShow] = useState<boolean>(false);
  const [enterNewPass, setEnterNewPass] = useState<boolean>(false);

  const [process, setProcess] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      consoleShow("user: ", user);
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      const interval = setInterval(() => {
        currentUser
          ?.reload()
          .then(() => {
            if (currentUser) {
              // setverifiedDone(true);
              clearInterval(interval);
            }
          })
          .catch((err: any) => {
            // alert(err.message);
          });
      }, 1000);
    }
  }, [currentUser]);

  const handleSignIn = async () => {
    setIsLoading(true);
    if (!emailPassword?.email || !emailPassword?.password) {
      toast.error("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        emailPassword.email,
        emailPassword.password
      );
      consoleShow("userCredential: ", userCredential);

      toast.success("Success Login");
      localStorage.setItem("userProfile", userCredential?.user?.uid);
      consoleShow("loginEmail", userCredential?.user);
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error?.code.split("auth/")[1]);
      setIsLoading(false);
    }
  };

  const handleResetPassSubmit = async (e: any) => {
    e.preventDefault(); // prevent page refresh
    setProcess(true);
    sendPasswordResetEmail(auth, emailPassword?.email)
      .then((res) => {
        consoleShow("res: ", res);
        // Email sent.
        setEnterNewPass(true);
        toast.success("Password reset email sent.");
        setEmailDialogShow(true);
        setProcess(false);
        // Show success message to user
      })
      .catch((error: any) => {
        toast.error(error.message);
        setProcess(false);
        // Show error message to user
      });
  };

  return (
    <>
      {forgotPass && (
        <KeyboardBackspaceIcon
          sx={{ cursor: "pointer", fontSize: "30px" }}
          onClick={() => setForgotPass(false)}
        />
      )}
      <div className="register_header text-center">
        <img
          src="../../assets/images/Icons/carftlogo.svg"
          className="modal_logo"
          alt="carftylogo"
        />
        <h5 className="mb-0 text-black-50">Carfty Art</h5>
        {/* <h5 className="color_green1 fw-normal">Welcome Back!</h5> */}
      </div>
      <section className="mobileEmail_input">
        <div className="form-area">
          {forgotPass ? (
            emailDialogShow ? (
              <div>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    my: 1,
                    fontSize: "25px",
                  }}
                >
                  Login With Your New Password
                </Typography>

                <div>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    A Verification Reset Password has been sent to:
                  </Typography>
                  <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
                    {emailPassword?.email}
                  </Typography>
                </div>

                <Typography sx={{ opacity: "0.7", textAlign: "center", mt: 2 }}>
                  Check your email <strong>{emailPassword?.email}</strong> and
                  create a new password and enter that password here
                </Typography>
              </div>
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  my: 2,
                  fontSize: "25px",
                }}
              >
                Forget your password?
              </Typography>
            )
          ) : (
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "500",
                my: 2,
                fontSize: "25px",
              }}
            >
              Welcome Back!
            </Typography>
          )}

          <div className="form-inner">
            <form>
              {!emailDialogShow && (
                <div className="form-group">
                  <label htmlFor="email" className="text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control   ${
                      emailPassword?.email ? "" : "is-invalid"
                    }`}
                    value={emailPassword?.email}
                    onChange={(e) =>
                      setemailPassword({
                        ...emailPassword,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {!forgotPass && (
                <div className="form-group mt-3">
                  <label htmlFor="e_password" className="text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    id="e_password"
                    className={`form-control  ${
                      emailPassword?.password ? "" : "is-invalid"
                    }`}
                    onChange={(e) =>
                      setemailPassword({
                        ...emailPassword,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {enterNewPass && (
                <div className="form-group mt-3">
                  <label htmlFor="e_password" className="text-muted">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="e_password"
                    className={`form-control  ${
                      emailPassword?.password ? "" : "is-invalid"
                    }`}
                    onChange={(e) =>
                      setemailPassword({
                        ...emailPassword,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              <div className="mt-3">
                {forgotPass ? (
                  enterNewPass ? (
                    <a
                      className="w-100 register_btn text-decoration-none"
                      onClick={handleSignIn}
                      //   onClick={handleClick}
                    >
                      Sign in
                    </a>
                  ) : process ? (
                    <a className="w-100 register_btn text-decoration-none">
                      Send email
                    </a>
                  ) : (
                    <a
                      className="w-100 register_btn text-decoration-none"
                      onClick={handleResetPassSubmit}
                      //   onClick={handleClick}
                    >
                      Send email
                    </a>
                  )
                ) : (
                  <a
                    className="w-100 register_btn text-decoration-none"
                    onClick={handleSignIn}
                    //   onClick={handleClick}
                  >
                    Sign in
                  </a>
                )}
              </div>
              {!forgotPass && (
                <div className="mt-2 text-end">
                  <a
                    href="javascript:;"
                    className="text-decoration-none text-muted"
                    onClick={() => setForgotPass(true)}
                  >
                    Forgot Password
                  </a>
                </div>
              )}
              <div className="sign_up_link d-flex align-items-center justify-content-center mt-2">
                <p className="mb-0">Don't have an account?</p>
                <a
                  id="signUp"
                  className="btn color_green1"
                  data-bs-toggle="modal"
                  href="#register_modal"
                  role="button"
                  ref={signUpRef}
                  onClick={() => toast.dismiss()}
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>

        {isLoading && (
          <main className="main">
            <span className="loader"></span>
          </main>
        )}
      </section>
    </>
  );
}
