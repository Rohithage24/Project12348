// components/SignupForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ add navigate
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  Name: Yup.string().min(3, "Name must be at least 3 characters").required("Full Name is required"),
  gmail: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password must be at least 8 characters and include a number and special character.")
    .required("Password is required"),
  mobile: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
  address: Yup.string().min(5, "Address must be at least 5 characters").required("Address is required"),
});

const SignupForm = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();   // ✅ initialize navigate

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setMessage(data.message || "Signup successful ✅ Redirecting to login...");
        resetForm();

        // ⏳ wait 1.5s then go to login page
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while signing up.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Signup Form</h2>

      <Formik
        initialValues={{ Name: "", gmail: "", password: "", mobile: "", address: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div>
              <Field type="text" name="Name" style={styles.input} placeholder="Full Name" />
              <ErrorMessage name="Name" component="div" style={styles.error} />
            </div>

            <div>
              <Field type="email" name="gmail" style={styles.input} placeholder="Email Address" />
              <ErrorMessage name="gmail" component="div" style={styles.error} />
            </div>

            <div>
              <Field type="password" name="password" style={styles.input} placeholder="Password" />
              <ErrorMessage name="password" component="div" style={styles.error} />
            </div>

            <div>
              <Field type="tel" name="mobile" style={styles.input} placeholder="Mobile Number" />
              <ErrorMessage name="mobile" component="div" style={styles.error} />
            </div>

            <div>
              <Field type="text" name="address" style={styles.input} placeholder="Address" />
              <ErrorMessage name="address" component="div" style={styles.error} />
            </div>

            <button type="submit" style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            {message && <div className="alert alert-info text-center mt-3">{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const styles = {
  container: { padding: "30px", textAlign: "center", maxWidth: "500px", margin: "0 auto" },
  heading: { marginBottom: "20px", color: "#3498db" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px", width: "100%" },
  button: { padding: "12px", backgroundColor: "#3498db", color: "white", fontSize: "16px", borderRadius: "8px", border: "none", cursor: "pointer" },
  error: { color: "red", fontSize: "14px", marginTop: "5px" },
};

export default SignupForm;




// // components/Signup.js
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

// // ✅ Yup Validation Schema
// const validationSchema = Yup.object({
//   Name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .required("Full Name is required"),
//   gmail: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: Yup.string()
//     .matches(
//       /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
//       "Password must be at least 8 characters and include a number and special character."
//     )
//     .required("Password is required"),
//   mobile: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
//     .required("Mobile number is required"),
//   address: Yup.string()
//     .min(5, "Address must be at least 5 characters")
//     .required("Address is required"),
// });

// const SignupForm = () => {
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       const data = await res.json();
//       console.log(data);

//       if (res.ok) {
//         setMessage(data.message || "Signup successful");
//         navigate('/');
//         resetForm();
//       } else {
//         setMessage(data.message || "Signup failed");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("An error occurred while signing up.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Signup Form</h2>

//       <Formik
//         initialValues={{
//           Name: "",
//           gmail: "",
//           password: "",
//           mobile: "",
//           address: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form style={styles.form}>
//             <div>
//               <Field
//                 type="text"
//                 name="Name"
//                 style={styles.input}
//                 placeholder="Full Name"
//               />
//               <ErrorMessage name="Name" component="div" style={styles.error} />
//             </div>

//             <div>
//               <Field
//                 type="email"
//                 name="gmail"
//                 style={styles.input}
//                 placeholder="Email Address"
//               />
//               <ErrorMessage name="gmail" component="div" style={styles.error} />
//             </div>

//             <div>
//               <Field
//                 type="password"
//                 name="password"
//                 style={styles.input}
//                 placeholder="Password"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 style={styles.error}
//               />
//             </div>

//             <div>
//               <Field
//                 type="tel"
//                 name="mobile"
//                 style={styles.input}
//                 placeholder="Mobile Number"
//               />
//               <ErrorMessage
//                 name="mobile"
//                 component="div"
//                 style={styles.error}
//               />
//             </div>

//             <div>
//               <Field
//                 type="text"
//                 name="address"
//                 style={styles.input}
//                 placeholder="Address"
//               />
//               <ErrorMessage
//                 name="address"
//                 component="div"
//                 style={styles.error}
//               />
//             </div>

//             <button
//               type="submit"
//               style={styles.button}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Signing Up..." : "Sign Up"}
//             </button>

//             {message && (
//               <div className="alert alert-info text-center mt-3">
//                 {message}
//               </div>
//             )}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "30px",
//     textAlign: "center",
//     maxWidth: "500px",
//     margin: "0 auto",
//   },
//   heading: {
//     marginBottom: "20px",
//     color: "#3498db",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     width: "100%",
//   },
//   button: {
//     padding: "12px",
//     backgroundColor: "#3498db",
//     color: "white",
//     fontSize: "16px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//     marginTop: "5px",
//   },
// };

// export default SignupForm;


