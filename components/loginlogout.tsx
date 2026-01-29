// "use client";

// import { useEffect, useState } from "react";
// import React from "react";



// import { User } from "@supabase/supabase-js";
// import { supabase } from "@/lib/Supabase1";








// const LoginLogout: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isRegister, setIsRegister] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   /* ---------- AUTH STATE ---------- */
//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_e, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

  

//   const signIn = async () => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) alert(error.message);
//   };

//   const signUp = async () => {
//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) alert(error.message);
//     else alert("Check email to verify your account");
//   };

//   const signInWithGoogle = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//   };

//   /* ---------- UI ---------- */

//   return (
//     <div style={panel}>
//       <h3 style={title}>
//         {user ? "My Account" : isRegister ? "Register" : "Login"}
//       </h3>

//       {user ? (
//         <>
//           <p style={userText}>{user.email}</p>

//           <button style={logoutBtn} onClick={logout}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           {/* Email */}
//           <input
//             style={input}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* Password */}
//           <input
//             style={input}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Login / Register */}
//           <button
//             style={primaryBtn}
//             onClick={isRegister ? signUp : signIn}
//           >
//             {isRegister ? "Register" : "Login"}
//           </button>

//           {/* Google */}
//           <button style={googleBtn} onClick={signInWithGoogle}>
//             Continue with Google
//           </button>

//           {/* Switch */}
//           <p style={switchText}>
//             {isRegister ? "Have account?" : "New user?"}{" "}
//             <span
//               style={switchLink}
//               onClick={() => setIsRegister(!isRegister)}
//             >
//               {isRegister ? "Login" : "Register"}
//             </span>
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default LoginLogout;



// const panel: React.CSSProperties = {
//   position: "fixed",
//   top: "20px",
//   right: "20px",

//   width: "300px",
//   padding: "20px",

//   background: "#ffffff",
//   borderRadius: "12px",

//   boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//   zIndex: 1000,

//   fontFamily: "Inter, Arial, sans-serif",
// };

// const title: React.CSSProperties = {
//   textAlign: "center",
//   marginBottom: "15px",
//   color: "#2563eb",
//   fontWeight: "600",
// };

// const input: React.CSSProperties = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",

//   borderRadius: "6px",
//   border: "1px solid #d1d5db",

//   fontSize: "14px",
// };

// const primaryBtn: React.CSSProperties = {
//   width: "100%",
//   padding: "10px",

//   background: "#2563eb",
//   color: "#fff",

//   border: "none",
//   borderRadius: "6px",

//   cursor: "pointer",
//   marginBottom: "8px",
// };

// const googleBtn: React.CSSProperties = {
//   width: "100%",
//   padding: "10px",

//   background: "#ea4335",
//   color: "#fff",

//   border: "none",
//   borderRadius: "6px",

//   cursor: "pointer",
//   marginBottom: "10px",
// };

// const logoutBtn: React.CSSProperties = {
//   width: "100%",
//   padding: "10px",

//   background: "#dc2626",
//   color: "#fff",

//   border: "none",
//   borderRadius: "6px",

//   cursor: "pointer",
// };

// const switchText: React.CSSProperties = {
//   fontSize: "12px",
//   textAlign: "center",
// };

// const switchLink: React.CSSProperties = {
//   color: "#2563eb",
//   fontWeight: "bold",
//   cursor: "pointer",
// };

// const userText: React.CSSProperties = {
//   textAlign: "center",
//   fontSize: "14px",
//   marginBottom: "12px",
// };



"use client";

import { useEffect, useState } from "react";
import React from "react";

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/Subapase1";

/* ================= AUTH COMPONENT ================= */

const LoginLogout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ---------- AUTH STATE ---------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // 👇 Save user to DB (Email + Google)
      if (currentUser) {
        await supabase.from("pushloginlogout").upsert({
          id: currentUser.id,
          email: currentUser.email,
          provider: currentUser.app_metadata.provider,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ---------- AUTH ACTIONS ---------- */

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
  };

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      await supabase.from("pushloginlogout").insert({
        id: data.user.id,
        email: data.user.email,
        provider: "email",
      });
    }

    alert("Check your email to verify your account");
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) alert(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  /* ---------- UI ---------- */

  return (
    <div style={panel}>
      <h3 style={title}>
        {user ? "My Account" : isRegister ? "Register" : "Login"}
      </h3>

      {user ? (
        <>
          <p style={userText}>{user.email}</p>
          <button style={logoutBtn} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            style={input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            style={primaryBtn}
            onClick={isRegister ? signUp : signIn}
          >
            {isRegister ? "Register" : "Login"}
          </button>

          <button style={googleBtn} onClick={signInWithGoogle}>
            Continue with Google
          </button>

          <p style={switchText}>
            {isRegister ? "Have an account?" : "New user?"}{" "}
            <span
              style={switchLink}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginLogout;

/* ================= STYLES ================= */

const panel: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  width: "300px",
  padding: "20px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  zIndex: 1000,
  fontFamily: "Inter, Arial, sans-serif",
};

const title: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "15px",
  color: "#2563eb",
  fontWeight: "600",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "8px",
};

const googleBtn: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#ea4335",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "10px",
};

const logoutBtn: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const switchText: React.CSSProperties = {
  fontSize: "12px",
  textAlign: "center",
};

const switchLink: React.CSSProperties = {
  color: "#2563eb",
  fontWeight: "bold",
  cursor: "pointer",
};

const userText: React.CSSProperties = {
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "12px",
};
