import * as React from "react";
import { Auth } from '@aws-amplify/auth';
import { StyleSheet } from "react-nativescript";
import { useAuthStore } from "../../store/authStore";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    try {
      const user = await Auth.signIn(email, password);
      setAuth(true, user);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <flexboxLayout className="flex-1 justify-center p-4 bg-white">
      <label className="text-2xl font-bold text-center mb-8">Language Learning</label>
      
      <textField
        className="p-4 border rounded mb-4"
        hint="Email"
        keyboardType="email"
        text={email}
        onTextChange={(e) => setEmail(e.value)}
      />
      
      <textField
        className="p-4 border rounded mb-6"
        hint="Password"
        secure={true}
        text={password}
        onTextChange={(e) => setPassword(e.value)}
      />
      
      <button
        className="bg-blue-500 text-white p-4 rounded"
        onTap={handleLogin}
      >
        Login
      </button>
    </flexboxLayout>
  );
}