"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSubmit = () => {
    authClient.signUp.email(
      { email, name, password },
      {
        onError: () => {
          window.alert("Error signing up, please try again.");
        },
        onSuccess: () => {
          window.alert(
            "Successfully signed up, please check your email to verify your account."
          );
        },
      }
    );
  };
  const onLogin = () => {
    authClient.signIn.email(
      { email, password },
      {
        onError: () => {
          window.alert("Error signing up, please try again.");
        },
        onSuccess: () => {
          window.alert(
            "Successfully signed up, please check your email to verify your account."
          );
        },
      }
    );
  };
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1>Welcome, {session.user.name}!</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-10">
      <div className="p4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="p4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
